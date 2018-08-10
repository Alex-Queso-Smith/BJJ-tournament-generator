class Tournament < ApplicationRecord
  validates :belt, presence: true
  validates :start_date, presence: true
  validates :winner, presence: true

  belongs_to :academy
end
