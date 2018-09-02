require 'rails_helper'

RSpec.describe Api::V1::AdvanceBracketsController, type: :controller do
  describe "POST#create" do
    let!(:user) { FactoryBot.create(:user) }
    let!(:academy) { FactoryBot.create(:academy, user: user) }
    let!(:tournament) { FactoryBot.create(:tournament, academy: academy) }
    let!(:bracket) { FactoryBot.create(:bracket, tournament: tournament) }
    let!(:entrant1) { FactoryBot.create(:user) }
    let!(:entrant2) { FactoryBot.create(:user) }
    let!(:entrant3) { FactoryBot.create(:user) }
    let!(:entrant4) { FactoryBot.create(:user) }

    it "should create new round for advancing tournament" do
      sign_in user
      tournament.update(bracket1_id: bracket.id)

      post :create, params: {
        tournament_id: tournament.id,
        entrants: [
          entrant1,
          entrant2,
          entrant3,
          entrant4
        ]
      }

      returned_json = JSON.parse(response.body)

      expect(response.status).to eq(200)
      expect(response.content_type).to eq('application/json')

      expect(returned_json.length).to eq(4)
      expect(returned_json["rounds"]).to be_a(Array)
      expect(returned_json["rounds"]).to_not be_a(Hash)
      expect(returned_json["rounds"].length).to eq(2)
    end
  end
end
