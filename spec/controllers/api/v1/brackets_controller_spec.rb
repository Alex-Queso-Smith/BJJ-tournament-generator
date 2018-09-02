require 'rails_helper'

RSpec.describe Api::V1::BracketsController, type: :controller do
  describe "POST#create" do
    let!(:user) { FactoryBot.create(:user) }
    let!(:academy) { FactoryBot.create(:academy, user: user) }
    let!(:tournament) { FactoryBot.create(:tournament, academy: academy) }
    let!(:entrant1) { FactoryBot.create(:user) }
    let!(:entrant2) { FactoryBot.create(:user) }
    let!(:entrant3) { FactoryBot.create(:user) }
    let!(:entrant4) { FactoryBot.create(:user) }
    let!(:entrant5) { FactoryBot.create(:user) }
    let!(:entrant6) { FactoryBot.create(:user) }
    let!(:entrant7) { FactoryBot.create(:user) }
    let!(:entrant8) { FactoryBot.create(:user) }

    it "should create the initial rounds for a tournament" do
      sign_in user

      post :create, params: {
        tournament_id: tournament.id,
        entrants: [
          entrant1,
          entrant2,
          entrant3,
          entrant4,
          entrant5,
          entrant6,
          entrant7,
          entrant8
        ]
      }

      returned_json = JSON.parse(response.body)

      expect(response.status).to eq(200)
      expect(response.content_type).to eq('application/json')

      expect(returned_json.length).to eq(4)
      expect(returned_json).to be_a(Hash)
      expect(returned_json).to_not be_a(Array)
      expect(returned_json["bracket"]["tournament_id"]).to eq(tournament.id)
      expect(returned_json["bracket"]["finished"]).to eq(false)
      expect(returned_json["rounds"]).to be_a(Array)
      expect(returned_json["rounds"]).to_not be_a(Hash)
      expect(returned_json["rounds"].length).to eq(4)
      expect(returned_json["bracket1_id"]).to eq(returned_json["bracket"]["id"])
      expect(returned_json["current_bracket_id"]).to eq(returned_json["bracket"]["id"])
    end
  end

  describe "PATCH#update" do
    let!(:user) { FactoryBot.create(:user) }
    let!(:academy) { FactoryBot.create(:academy, user: user) }
    let!(:tournament) { FactoryBot.create(:tournament, academy: academy) }
    let!(:bracket) { FactoryBot.create(:bracket, tournament: tournament) }
    let!(:round) { FactoryBot.create(:round, bracket: bracket) }
    let!(:winner) { FactoryBot.create(:user) }

    it "should update the tournament winner" do
      sign_in user
      round.update(winner: winner.name_with_nickname)
      
      patch :update, params: {
        tournament_id: tournament.id,
        id: bracket.id
      }

      returned_json = JSON.parse(response.body)

      expect(response.status).to eq(200)
      expect(response.content_type).to eq('application/json')

      expect(returned_json.length).to eq(1)
      expect(returned_json).to be_a(Hash)
      expect(returned_json).to_not be_a(Array)
      expect(returned_json["winner"]).to eq(winner.name_with_nickname)
    end
  end
end
