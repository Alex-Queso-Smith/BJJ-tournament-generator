class Tournament < ApplicationRecord
  validates :belt, presence: true
  validates :start_date, presence: true
  validates :gender, presence: true
  belongs_to :academy

  has_many :tourney_rosters, dependent: :destroy
  has_many :users, through: :tourney_rosters

  has_many :brackets, dependent: :destroy
  has_many :youtube_videos, dependent: :destroy

  def sort_entrant_names(entrants)
    name_entrants = []
    entrants.each do |entrant|
      name_entrants << entrant.name_with_nickname
    end
    name_entrants
  end
end
