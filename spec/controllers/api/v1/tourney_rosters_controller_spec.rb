require 'rails_helper'

RSpec.describe Api::V1::TourneyRostersController, type: :controller do
  describe "POST#create" do
    let!(:user) { FactoryBot.create(:user) }
    let!(:academy) { FactoryBot.create(:academy, user: user) }
    let!(:tournament) { FactoryBot.create(:tournament, academy: academy) }

    it "should create a new tourney roster for entrant" do
      sign_in user

      post :create, params: {
        tournament_id: tournament.id
      }

      returned_json = JSON.parse(response.body)

      expect(response.status).to eq(200)
      expect(response.content_type).to eq('application/json')

      expect(returned_json.length).to eq(2)
      expect(returned_json["new_entrant"]).to eq(user.name_with_nickname)
      expect(returned_json["roster_id"]).to eq(TourneyRoster.last.id)
    end
  end
end
