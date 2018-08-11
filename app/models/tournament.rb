class Tournament < ApplicationRecord
  validates :belt, presence: true
  validates :start_date, presence: true
  validates :gender, presence: true
  belongs_to :academy

  has_many :tourney_rosters
  has_many :users, through: :tourney_rosters
end
