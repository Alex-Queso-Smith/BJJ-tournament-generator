require 'rails_helper'

RSpec.describe TourneyRoster, type: :model do
  describe "validations" do
    let!(:user) { FactoryBot.build(:user) }
    let!(:academy) { FactoryBot.build(:academy, user: user) }
    let!(:tournament) { FactoryBot.build(:tournament, academy: academy) }
    let!(:tourney_roster1) { FactoryBot.build(:tourney_roster, tournament: tournament, user: user) }
    let!(:tourney_roster2) { FactoryBot.build(:tourney_roster, user: user) }
    let!(:tourney_roster3) { FactoryBot.build(:tourney_roster, tournament: tournament) }

    it "is valid with all required fields filled in" do
      expect(tourney_roster1).to be_valid
    end

    it "is invalid if tournament not specified" do
      expect(tourney_roster2).to_not be_valid
    end

    it "is invalid if user not specified" do
      expect(tourney_roster3).to_not be_valid
    end
  end
end
