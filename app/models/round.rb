class Round < ApplicationRecord
  validates :entrant1, presence: true
  validates :entrant2, presence: true

  belongs_to :bracket

  def create_initial_rounds(entrants, bracket)
    current_entrants = entrants
    rounds = []
    errors = []

    while current_entrants.length != 0 do
      first_e_ob = current_entrants[0]
      second_e_ob = current_entrants[1]
      first_entrant = ''
      second_entrant = ''

      if !first_e_ob[:nickname].nil?
        first_entrant = "#{first_e_ob[:first_name]} '#{first_e_ob[:nickname]}' #{first_e_ob[:last_name]}"
      else
        first_entrant = "#{first_e_ob[:first_name]} #{first_e_ob[:last_name]}"
      end

      if !second_e_ob[:nickname].nil?
        second_entrant = "#{second_e_ob[:first_name]} '#{second_e_ob[:nickname]}' #{second_e_ob[:last_name]}"
      else
        second_entrant = "#{second_e_ob[:first_name]} #{second_e_ob[:last_name]}"
      end

      new_round = Round.new(
        bracket: bracket,
        entrant1: first_entrant,
        entrant2: second_entrant
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
