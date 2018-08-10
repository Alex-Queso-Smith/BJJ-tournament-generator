require 'rails_helper'

RSpec.describe Round, type: :model do
  describe "validations" do
    let!(:user) { FactoryBot.build(:user) }
    let!(:academy) { FactoryBot.build(:academy, user: user) }
    let!(:tournament) { FactoryBot.build(:tournament, academy: academy) }
    let!(:bracket) { FactoryBot.build(:bracket, tournament: tournament) }
    let!(:round1) { FactoryBot.build(:round, bracket: bracket) }
    let!(:round2) { FactoryBot.build(:round, bracket: bracket, entrant1: "") }
    let!(:round3) { FactoryBot.build(:round, bracket: bracket, entrant2: "") }
    let!(:round4) { FactoryBot.build(:round) }

    it "is valid with all required fields filled in" do
      expect(round1).to be_valid
    end

    it "is invalid if entrant1 not specified" do
      expect(round2).to_not be_valid
    end

    it "is invalid if entrant1 not specified" do
      expect(round3).to_not be_valid
    end

    it "is invalid if bracket not specified" do
      expect(round4).to_not be_valid
    end
  end
end
