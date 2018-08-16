class YoutubeVideo < ApplicationRecord
  validates :video_id, presence: true

  belongs_to :tournament
end
