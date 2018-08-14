class Bracket < ApplicationRecord

  belongs_to :tournament
  has_many :rounds

  def assign_initial_bracket(tournament, bracket)
      tournament.update(
        tournament_begun: true,
        bracket1_id: bracket.id,
        current_bracket_id: bracket.id
      )
  end

  def assign_advance_bracket(tournament, bracket)
    tournament.update(
      bracket2_id: bracket.id,
      current_bracket_id: bracket.id
    )
  end

  def assign_final_bracket(tournament, bracket)
    tournament.update(
      bracket3_id: bracket.id,
      current_bracket_id: bracket.id
    )
  end

  def determine_bracket_winners(rounds)
    winners = []

    rounds.each do |round|
      if !round.winner.nil?
        winners.push(round.winner)
      end
    end
    winners
  end
end
