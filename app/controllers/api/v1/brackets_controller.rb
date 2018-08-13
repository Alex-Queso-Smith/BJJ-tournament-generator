class Api::V1::BracketsController < ApiController
  def create

    tournament = Tournament.find(params[:tournament_id])
    bracket = Bracket.create(tournament: tournament)

    Bracket.new.assign_initial_bracket(tournament, bracket)

    created_initial_rounds = Round.new.create_initial_rounds(params[:entrants], bracket)

    if created_initial_rounds
      render json: {
        bracket: bracket,
        rounds: created_initial_rounds,
        bracket1_id: tournament.bracket1_id,
        current_bracket_id: tournament.current_bracket_id
       }
    else
      render json: { error: 'Creation Failed' }, status: 422
    end
  end

  def update
  end
end
