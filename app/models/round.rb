class Round < ApplicationRecord
  validates :entrant1, presence: true
  validates :entrant2, presence: true
  
  belongs_to :bracket
end
