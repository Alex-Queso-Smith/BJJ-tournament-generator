class Api::V1::RoundsController < ApiController
  before_action :authenticate_user!

  def update
    round = Round.find(params[:id])
    uncheckedEntrant = find_other_entrant(params[:winner])

    if round.update(winner: params[:winner])
      rounds = round.bracket.rounds.sort
      render json: { rounds: rounds, uncheckedEntrant: uncheckedEntrant, winner: params[:winner] }
    else
      render json: { errors: round.errors }, status: 422
    end
  end

  private

  def find_other_entrant(entrant)
    return Round.find_by(entrant1: entrant).entrant2 if Round.find_by(entrant1: entrant)
    return Round.find_by(entrant2: entrant).entrant1 if Round.find_by(entrant2: entrant)
  end

end
