require 'rails_helper'

RSpec.describe Bracket, type: :model do
  describe "validations" do
    let!(:user) { FactoryBot.build(:user) }
    let!(:academy) { FactoryBot.build(:academy, user: user) }
    let!(:tournament) { FactoryBot.build(:tournament, academy: academy) }
    let!(:bracket1) { FactoryBot.build(:bracket, tournament: tournament) }
    let!(:bracket2) { FactoryBot.build(:bracket) }

    it "is valid with all required fields filled in" do
      expect(bracket1).to be_valid
    end

    it "is invalid if tournament not specified" do
      expect(bracket2).to_not be_valid
    end
  end
end
