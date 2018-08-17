class Api::V1::FinalRoundsController < ApiController
  before_action :authenticate_user!

  def create
    tournament = Tournament.find(params[:tournament_id])
    bracket = Bracket.create(tournament: tournament)

    Bracket.new.assign_final_bracket(tournament, bracket)

    bracket2 = Bracket.find(tournament.bracket2_id)
    bracket2.update(finished: true)

    create_final_round = Round.new.create_advance_rounds(params[:entrants], bracket)

    if create_final_round
      render json: {
        bracket: bracket,
        round: create_final_round,
        bracket3_id: bracket.id,
        current_bracket_id: bracket.id
      }
    else
      render json: { error: 'Creation Failed' }, status: 422
    end
  end
end
