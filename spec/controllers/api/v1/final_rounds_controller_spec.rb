require 'rails_helper'

RSpec.describe Api::V1::FinalRoundsController, type: :controller do
  describe "POST#create" do
    let!(:user) { FactoryBot.create(:user) }
    let!(:academy) { FactoryBot.create(:academy, user: user) }
    let!(:tournament) { FactoryBot.create(:tournament, academy: academy) }
    let!(:entrant1) { FactoryBot.create(:user) }
    let!(:entrant2) { FactoryBot.create(:user) }
    let!(:round) { FactoryBot.create(:round, bracket: bracket) }
    let!(:winner) { FactoryBot.create(:user) }
    let!(:bracket) { FactoryBot.create(:bracket, tournament: tournament) }

    it "should create the final round" do
      sign_in user
      round.update(winner: winner.name_with_nickname)
      tournament.update(bracket2_id: bracket.id)
      
      post :create, params: {
        tournament_id: tournament,
        entrants: [
          entrant1,
          entrant2
        ]
      }

      returned_json = JSON.parse(response.body)

      expect(response.status).to eq(200)
      expect(response.content_type).to eq('application/json')
    end
  end
end
