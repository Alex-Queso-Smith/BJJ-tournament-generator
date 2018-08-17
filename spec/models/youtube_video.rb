require 'rails_helper'

RSpec.describe YoutubeVideo, type: :model do
  describe "validations" do
    let!(:user) { FactoryBot.build(:user) }
    let!(:academy) { FactoryBot.build(:academy, user: user) }
    let!(:tournament) { FactoryBot.build(:tournament, academy: academy) }
    let!(:youtube_video1) { FactoryBot.build(:youtube_video, tournament: tournament) }
    let!(:youtube_video2) { FactoryBot.build(:youtube_video) }
    let!(:youtube_video3) { FactoryBot.build(:youtube_video, tournament: tournament, video_id: "") }

    it "is valid with all required fields filled in" do
      expect(youtube_video1).to be_valid
    end

    it "is invalid with tournament missing" do
      expect(youtube_video2).to_not be_valid
    end

    it "is invalid with video_id missing" do
      expect(youtube_video3).to_not be_valid
    end
  end
end
