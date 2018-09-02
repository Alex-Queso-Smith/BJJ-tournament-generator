require 'rails_helper'

RSpec.describe Api::V1::AcademiesController, type: :controller do

  describe "GET#index" do
    let!(:admin) { FactoryBot.create(:user, admin: true) }
    let!(:instructor) { FactoryBot.create(:user, instructor: true) }
    let!(:user1) { FactoryBot.create(:user) }
    let!(:user2) { FactoryBot.create(:user) }
    let!(:academy1) { FactoryBot.create(:academy, user: user1) }
    let!(:academy2) { FactoryBot.create(:academy, name: "Gracie Barra", user: user2) }

    it "should return a list of all academies" do
      get :index
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq(200)
      expect(response.content_type).to eq('application/json')

      expect(returned_json.length).to eq(4)
      expect(returned_json["academies"].length).to eq(2)
      expect(returned_json["academies"][0]["name"]).to eq("Gracie Humaita")
      expect(returned_json["academies"][1]["name"]).to eq("Gracie Barra")
    end

    it "should return admin status of current user" do
      sign_in admin

      get :index

      returned_json = JSON.parse(response.body)

      expect(response.status).to eq(200)
      expect(response.content_type).to eq('application/json')

      expect(returned_json.length).to eq(4)
      expect(returned_json["admin_status"]).to eq(true)
    end

    it "should return instructor status of current user" do
      sign_in instructor

      get :index
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq(200)
      expect(response.content_type).to eq('application/json')

      expect(returned_json.length).to eq(4)
      expect(returned_json["instructor_status"]).to eq(true)
    end

    it "should return academy id of current user" do
      sign_in user1

      get :index
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq(200)
      expect(response.content_type).to eq('application/json')

      expect(returned_json.length).to eq(4)
      expect(returned_json["current_user_academy_id"]).to eq(user1.academy_id)
    end
  end

  describe "GET#show" do
    let!(:admin) { FactoryBot.create(:user, admin: true) }
    let!(:user1) { FactoryBot.create(:user) }
    let!(:user2) { FactoryBot.create(:user) }
    let!(:academy1) { FactoryBot.create(:academy, user: user1) }
    let!(:academy2) { FactoryBot.create(:academy, name: "Gracie Barra", user: user2) }
    let!(:student1) { FactoryBot.create(:user, academy: academy1) }
    let!(:student2) { FactoryBot.create(:user, belt: "White", academy: academy1) }
    let!(:student3) { FactoryBot.create(:user, belt: "Purple", academy: academy1) }
    let!(:student4) { FactoryBot.create(:user, belt: "Brown", academy: academy1) }
    let!(:student5) { FactoryBot.create(:user, belt: "Black", academy: academy1) }
    let!(:tournament1) { FactoryBot.create(:tournament, academy: academy1) }
    let!(:tournament2) { FactoryBot.create(:tournament, academy: academy1, finished: true) }

      it "should return info for a specific academy" do
        get :show, params: { id: academy1.id }
        returned_json = JSON.parse(response.body)

        expect(response.status).to eq 200
        expect(response.content_type).to eq('application/json')

        expect(returned_json.length).to eq(11)
        expect(returned_json["academy"]).to be_a(Hash)
        expect(returned_json).to_not be_a(Array)
        expect(returned_json["academy"]["name"]).to eq("Gracie Humaita")
        expect(returned_json["academy"]["address"]).to eq("502 S Lamar Blvd.")
        expect(returned_json["academy"]["city"]).to eq("Austin")
        expect(returned_json["academy"]["state"]).to eq("TX")
        expect(returned_json["academy"]["zipcode"]).to eq("78735")
        expect(returned_json["academy"]["website"]).to eq("https://www.graciehumaitaaustin.com")
      end

      it "should return admin status for current user" do
        sign_in admin

        get :show, params: { id: academy1.id }
        returned_json = JSON.parse(response.body)

        expect(response.status).to eq 200
        expect(response.content_type).to eq('application/json')

        expect(returned_json["admin_status"]).to eq(true)
      end

      it "should return user id for current user" do
        sign_in user1

        get :show, params: { id: academy1.id }
        returned_json = JSON.parse(response.body)

        expect(response.status).to eq 200
        expect(response.content_type).to eq('application/json')

        expect(returned_json["user_id"]).to eq(user1.id)
      end

      it "should return a list of students for an academy" do
        get :show, params: { id: academy1.id }
        returned_json = JSON.parse(response.body)

        expect(response.status).to eq 200
        expect(response.content_type).to eq('application/json')

        expect(returned_json["students"].length).to eq(5)
      end

      it "should return a list of white belts for an academy" do
        get :show, params: { id: academy1.id }
        returned_json = JSON.parse(response.body)

        expect(response.status).to eq 200
        expect(response.content_type).to eq('application/json')

        expect(returned_json["white_belts"].length).to eq(1)
      end

      it "should return a list of blue belts for an academy" do
        get :show, params: { id: academy1.id }
        returned_json = JSON.parse(response.body)

        expect(response.status).to eq 200
        expect(response.content_type).to eq('application/json')

        expect(returned_json["blue_belts"].length).to eq(1)
      end

      it "should return a list of purple belts for an academy" do
        get :show, params: { id: academy1.id }
        returned_json = JSON.parse(response.body)

        expect(response.status).to eq 200
        expect(response.content_type).to eq('application/json')

        expect(returned_json["purple_belts"].length).to eq(1)
      end

      it "should return a list of brown belts for an academy" do
        get :show, params: { id: academy1.id }
        returned_json = JSON.parse(response.body)

        expect(response.status).to eq 200
        expect(response.content_type).to eq('application/json')

        expect(returned_json["brown_belts"].length).to eq(1)
      end

      it "should return a list of black_belts for an academy" do
        get :show, params: { id: academy1.id }
        returned_json = JSON.parse(response.body)

        expect(response.status).to eq 200
        expect(response.content_type).to eq('application/json')

        expect(returned_json["black_belts"].length).to eq(1)
      end

      it "should return a list of open tournaments for an academy" do
        get :show, params: { id: academy1.id }
        returned_json = JSON.parse(response.body)

        expect(response.status).to eq 200
        expect(response.content_type).to eq('application/json')

        expect(returned_json["open_tournaments"].length).to eq(1)
      end

      it "should return a list of closed tournaments for an academy" do
        get :show, params: { id: academy1.id }
        returned_json = JSON.parse(response.body)

        expect(response.status).to eq 200
        expect(response.content_type).to eq('application/json')

        expect(returned_json["closed_tournaments"].length).to eq(1)
      end
    end

  describe "POST#create" do
    let!(:user1) { FactoryBot.create(:user) }

    it "should create a new academy" do
      sign_in user1

      post :create, params: {
          name: "Gracie Humaita",
          address: "350 South Lamar",
          city: "Austin",
          state: "TX",
          zipcode: "78735",
          website: "www.austinjiujitsu.com"
      }

      returned_json = JSON.parse(response.body)

      expect(response.status).to eq(200)
      expect(response.content_type).to eq('application/json')

      expect(returned_json.length).to eq(1)
      expect(returned_json["academy"]).to be_a(Hash)
      expect(returned_json["academy"]).to_not be_a(Array)
      expect(returned_json["academy"]["name"]).to eq("Gracie Humaita")
      expect(returned_json["academy"]["address"]).to eq("350 South Lamar")
      expect(returned_json["academy"]["city"]).to eq("Austin")
      expect(returned_json["academy"]["state"]).to eq("TX")
      expect(returned_json["academy"]["zipcode"]).to eq("78735")
      expect(returned_json["academy"]["website"]).to eq("www.austinjiujitsu.com")
    end
  end

  describe "PATCH#update" do
    let!(:user1) { FactoryBot.create(:user) }
    let!(:academy) { FactoryBot.create(:academy, user: user1) }

    it "should update an academy" do
      sign_in user1

      patch :update, params: { id: academy.id }

      returned_json = JSON.parse(response.body)

      expect(response.status).to eq(200)
      expect(response.content_type).to eq('application/json')

      expect(returned_json.length).to eq(1)
      expect(returned_json["academy"]).to be_a(Hash)
      expect(returned_json["academy"]).to_not be_a(Array)
      expect(returned_json["academy"]["name"]).to eq("Gracie Humaita")
      expect(returned_json["academy"]["address"]).to eq("502 S Lamar Blvd.")
      expect(returned_json["academy"]["city"]).to eq("Austin")
      expect(returned_json["academy"]["state"]).to eq("TX")
      expect(returned_json["academy"]["zipcode"]).to eq("78735")
      expect(returned_json["academy"]["website"]).to eq("https://www.graciehumaitaaustin.com")
    end
  end
end
