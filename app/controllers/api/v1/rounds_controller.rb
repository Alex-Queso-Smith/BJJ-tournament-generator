class Api::V1::RoundsController < ApiController
  def update
    round = Round.find(params[:id])
    uncheckedEntrant = find_other_entrant(params[:_json])

    if round.update(winner: params[:_json])
      rounds = round.bracket.rounds.sort

      render json: { rounds: rounds, uncheckedEntrant: uncheckedEntrant }
    else
      render json: { errors: round.errors }, status: 422
    end
  end

  private

  def find_other_entrant(entrant)
    if Round.find_by(entrant1: entrant)
      return Round.find_by(entrant1: entrant).entrant2
    end

    if Round.find_by(entrant2: entrant)
      return Round.find_by(entrant2: entrant).entrant1
    end
  end

end
