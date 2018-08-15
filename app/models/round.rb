class Round < ApplicationRecord
  validates :entrant1, presence: true
  validates :entrant2, presence: true

  belongs_to :bracket

  def create_advance_rounds(entrants, bracket)
    current_entrants = entrants
    rounds = []
    errors = []

    while current_entrants.length != 0 do
      new_round = Round.new(
        bracket: bracket,
        entrant1: current_entrants[0],
        entrant2: current_entrants[1]
      )
      current_entrants.shift(2)

      if new_round.save
        rounds.push(new_round)
      else
        errors.push(new_round.errors)
      end
    end

    if errors.length == 0
      rounds
    else
      false
    end
  end

end
