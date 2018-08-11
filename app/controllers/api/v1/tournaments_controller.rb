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

    render json: { tournament: tournament, current_user_id: current_user.id, entrants: entrants }
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
