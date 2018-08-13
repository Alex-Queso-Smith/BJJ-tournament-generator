class Api::V1::AdvanceBracketsController < ApiController
  def create
    tournament = Tournament.find(params[:tournament_id])
    bracket = Bracket.create(tournament: tournament)

    Bracket.new.assign_advance_bracket(tournament, bracket)

    bracket1 = Bracket.find(tournament.bracket1_id)
    bracket1.update(finished: true)

    created_advance_rounds = Round.new.create_advance_rounds(params[:entrants], bracket)

    if created_advance_rounds

      render json: {
        bracket: bracket,
        rounds: created_advance_rounds,
        bracket2_id: bracket.id,
        current_bracket_id: bracket.id
      }
    else
      render json: { error: 'Creation Failed' }, status: 422
    end
  end

end
