class Api::V1::TournamentsController < ApiController

  def new
    new_tournament = Tournament.new
  end

  def create
    new_tournament = Tournament.new(tournament_params)
    new_tournament.academy = Academy.find(params[:academy_id])

    if new_tournament.save
      render json: { tournament: new_tournament }
    else
      render json: { errors: new_tournament.errors }, status: 422
    end
  end

  def show

    tournament = Tournament.find(params[:id])
    entrants = tournament.users

    roster_id = false

    if TourneyRoster.find_by(tournament: tournament, user: current_user)
      roster_id = TourneyRoster.find_by(tournament: tournament, user: current_user).id
    end

    current_bracket_id = false

    if tournament.current_bracket_id
      current_bracket_id = tournament.current_bracket_id
    end

    initial_rounds = false
    bracket1_id = tournament.bracket1_id
    
    if bracket1_id
      initial_rounds = Bracket.find_by(bracket1_id).rounds
    end
    render json: {
      tournament: tournament,
      current_user_id: current_user.id,
      entrants: entrants,
      roster_id: roster_id,
      instructor_status: current_user.instructor?,
      initial_rounds: initial_rounds,
      current_bracket_id: tournament.current_bracket_id
     }
  end

  def update

  end

  private

  def tournament_params
    params
      .permit(
        :id,
        :gender,
        :belt,
        :weight,
        :start_date,
        :academy_id
      )
  end

end
