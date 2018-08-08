require 'rails_helper'

RSpec.describe User, type: :model do
  describe "validations" do
    let!(:user1) { FactoryBot.build(:user) }
    let!(:user2) { FactoryBot.build(:user, email: "") }
    let!(:user3) { FactoryBot.build(:user, password: "") }
    let!(:user4) { FactoryBot.build(:user, password_confirmation: "passwor") }
    let!(:user5) { FactoryBot.build(:user, first_name: "") }
    let!(:user6) { FactoryBot.build(:user, last_name: "") }
    let!(:user7) { FactoryBot.build(:user, belt: "") }

    it "is valid with all required fields filled in" do
      expect(user1).to be_valid
    end

    it "is invalid with email missing" do
      expect(user2).to_not be_valid
    end

    it "is invalid with password missing" do
      expect(user3).to_not be_valid
    end

    it "is invalid with password confirmation not matching" do
      expect(user4).to_not be_valid
    end

    it "is invalid with first name missing" do
      expect(user5).to_not be_valid
    end

    it "is invalid with last name missing" do
      expect(user6).to_not be_valid
    end


    it "is invalid with belt missing " do
      expect(user7).to_not be_valid
    end
  end
end
