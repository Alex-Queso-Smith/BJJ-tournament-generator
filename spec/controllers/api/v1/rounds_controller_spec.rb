require 'rails_helper'

RSpec.describe Api::V1::RoundsController, type: :controller do
  describe "PATCH#update" do
    let!(:user) { FactoryBot.create(:user) }
    let!(:academy) { FactoryBot.create(:academy, user: user) }
    let!(:tournament) { FactoryBot.create(:tournament, academy: academy) }
    let!(:bracket) { FactoryBot.create(:bracket, tournament: tournament) }
    let!(:round) { FactoryBot.create(:round, bracket: bracket) }
    let!(:winner) { FactoryBot.create(:user) }
    let!(:nonWinner) { FactoryBot.create(:user) }

    it "should update round with winner" do
      sign_in user

      patch :update, params: {
        id: round.id,
        winner: winner.name_with_nickname
      }

      returned_json = JSON.parse(response.body)

      expect(response.status).to eq(200)
      expect(response.content_type).to eq('application/json')

      expect(returned_json.length).to eq(3)
      expect(returned_json).to be_a(Hash)
      expect(returned_json).to_not be_a(Array)
      expect(returned_json["winner"]).to eq(winner.name_with_nickname)
      expect(returned_json["uncheckedEntrant"]).to eq(nil)
      expect(returned_json["rounds"]).to be_a(Array)
    end
  end
end
