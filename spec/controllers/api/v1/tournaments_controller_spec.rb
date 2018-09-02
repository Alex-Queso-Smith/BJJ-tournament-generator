require 'rails_helper'

RSpec.describe Api::V1::TournamentsController, type: :controller do
  describe "GET#show" do
    let!(:user) { FactoryBot.create(:user) }
    let!(:academy) { FactoryBot.create(:academy, user: user) }
    let!(:tournament) { FactoryBot.create(:tournament, academy: academy) }

    it "should return info for a specific tournament" do
      sign_in user
      user.update(academy: academy)

      get :show, params: { id: tournament.id }
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq('application/json')

      expect(returned_json.length).to eq(18)
      expect(returned_json).to be_a(Hash)
      expect(returned_json).to_not be_a(Array)
      expect(returned_json["tournament"]["belt"]).to eq("Blue")
      expect(returned_json["tournament"]["start_date"]).to eq("May 1st 2018")
      expect(returned_json["tournament"]["gender"]).to eq("Men's")
      expect(returned_json["tournament"]["winner"]).to eq(nil)
      expect(returned_json["tournament"]["academy_id"]).to eq(academy.id)
      expect(returned_json["tournament"]["tournament_begun"]).to eq(false)
      expect(returned_json["tournament"]["bracket1_id"]).to eq(nil)
      expect(returned_json["tournament"]["bracket2_id"]).to eq(nil)
      expect(returned_json["tournament"]["bracket3_id"]).to eq(nil)
      expect(returned_json["tournament"]["current_bracket_id"]).to eq(nil)
      expect(returned_json["current_user_id"]).to eq(user.id)
      expect(returned_json["current_user_academy_id"]).to eq(user.academy_id)
      expect(returned_json["user_entered"]).to eq(false)
      expect(returned_json["name"]).to eq(user.name_with_nickname)
      expect(returned_json["entrants"]).to be_a(Array)
      expect(returned_json["entrants"].length).to be(0)
      expect(returned_json["roster_id"]).to be(nil)
      expect(returned_json["instructor_status"]).to be(false)
      expect(returned_json["admin_status"]).to be(false)
      expect(returned_json["initial_rounds"]).to be(nil)
      expect(returned_json["bracket1_winners"]).to be_a(Array)
      expect(returned_json["bracket1_winners"].length).to be(0)
      expect(returned_json["bracket2_rounds"]).to be(nil)
      expect(returned_json["bracket2_winners"].length).to be(0)
      expect(returned_json["bracket3_round"]).to be(nil)
      expect(returned_json["bracket3_winner"].length).to be(0)
      expect(returned_json["bracket1_finished"]).to be(nil)
      expect(returned_json["bracket2_finished"]).to be(nil)
      expect(returned_json["bracket3_finished"]).to be(nil)
    end
  end

  describe "POST#create" do
    let!(:user) { FactoryBot.create(:user) }
    let!(:academy) { FactoryBot.create(:academy, user: user) }

    it "should create a new tournament for an academy" do
      sign_in user

      post :create, params: {
        academy_id: academy.id,
        gender: "Mens",
        belt: "White",
        weight: "absolute",
        start_date: "May 5th, 2018"
      }

      returned_json = JSON.parse(response.body)

      expect(response.status).to eq(200)
      expect(response.content_type).to eq('application/json')

      expect(returned_json.length).to eq(1)
      expect(returned_json).to be_a(Hash)
      expect(returned_json).to_not be_a(Array)
      expect(returned_json["tournament"].length).to eq(15)
      expect(returned_json["tournament"]["belt"]).to eq("White")
      expect(returned_json["tournament"]["gender"]).to eq("Mens")
      expect(returned_json["tournament"]["weight"]).to eq("absolute")
      expect(returned_json["tournament"]["start_date"]).to eq("May 5th, 2018")
      expect(returned_json["tournament"]["academy_id"]).to eq(academy.id)
      expect(returned_json["tournament"]["finished"]).to eq(false)
      expect(returned_json["tournament"]["winner"]).to eq(nil)
      expect(returned_json["tournament"]["tournament_begun"]).to eq(false)
      expect(returned_json["tournament"]["bracket1_id"]).to eq(nil)
      expect(returned_json["tournament"]["bracket2_id"]).to eq(nil)
      expect(returned_json["tournament"]["bracket2_id"]).to eq(nil)
      expect(returned_json["tournament"]["current_bracket_id"]).to eq(nil)
    end
  end

  describe "DELETE#destroy" do
    let!(:user) { FactoryBot.create(:user) }
    let!(:academy) { FactoryBot.create(:academy, user: user) }
    let!(:tournament) { FactoryBot.create(:tournament, academy: academy) }

    it "should destroy a tournament" do
      sign_in user

      delete :destroy, params: {
        id: tournament.id
      }

      returned_json = JSON.parse(response.body)

      expect(response.status).to eq(200)
      expect(response.content_type).to eq('application/json')

      expect(returned_json.length).to eq(1)
      expect(returned_json).to be_a(Hash)
      expect(returned_json).to_not be_a(Array)
      expect(returned_json["message"]).to eq("Delete Successful")
    end
  end
end
