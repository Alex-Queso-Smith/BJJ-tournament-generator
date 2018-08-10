require 'rails_helper'

RSpec.describe Tournament, type: :model do
  describe "validations" do
    let!(:user) { FactoryBot.build(:user) }
    let!(:academy) { FactoryBot.build(:academy, user: user) }
    let!(:tournament1) { FactoryBot.build(:tournament, academy: academy) }
    let!(:tournament2) { FactoryBot.build(:tournament, academy: academy, start_date: "") }
    let!(:tournament3) { FactoryBot.build(:tournament, academy: academy, belt: "") }
    let!(:tournament4) { FactoryBot.build(:tournament) }

    it "is valid with all required fields filled in" do
      expect(tournament1).to be_valid
    end

    it "is invalid with start_date missing" do
      expect(tournament2).to_not be_valid
    end

    it "is invalid with belt missing" do
      expect(tournament3).to_not be_valid
    end

    it "is invalid with academy missing" do
      expect(tournament4).to_not be_valid
    end
  end
end
