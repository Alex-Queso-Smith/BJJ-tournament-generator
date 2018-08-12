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

    render json: {
      tournament: tournament,
      current_user_id: current_user.id,
      entrants: entrants,
      roster_id: roster_id,
      instructor_status: current_user.instructor?
     }
  end

  private

  def tournament_params
    params
      .permit(
        :gender,
        :belt,
        :weight,
        :start_date,
        :academy_id
      )
  end

end
