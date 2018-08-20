require 'rails_helper'

RSpec.describe Api::V1::TournamentsController, type: :controller do
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
