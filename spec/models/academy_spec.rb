require 'rails_helper'

RSpec.describe Academy, type: :model do
  describe "validations" do
    let!(:user) { FactoryBot.build(:user) }
    let!(:academy1) { FactoryBot.build(:academy, user: user) }
    let!(:academy2) { FactoryBot.build(:academy, user: user, name: "") }
    let!(:academy3) { FactoryBot.build(:academy, user: user, address: "") }
    let!(:academy4) { FactoryBot.build(:academy, user: user, city: "") }
    let!(:academy5) { FactoryBot.build(:academy, user: user, state: "") }
    let!(:academy6) { FactoryBot.build(:academy, user: user, zipcode: "") }
    let!(:academy7) { FactoryBot.build(:academy) }

    it "is valid with all required fields filled in" do
      expect(academy1).to be_valid
    end

    it "is invalid if name not filled in" do
      expect(academy2).to_not be_valid
    end

    it "is invalid if address not filled in" do
      expect(academy3).to_not be_valid
    end

    it "is invalid if city not filled in" do
      expect(academy4).to_not be_valid
    end

    it "is invalid if state not filled in" do
      expect(academy5).to_not be_valid
    end

    it "is invalid if zipcode not filled in" do
      expect(academy6).to_not be_valid
    end

    it "is invalid if user not specified" do
      expect(academy7).to_not be_valid
    end

  end
end
