class Api::V1::TournamentsController < ApiController

  def new
    new_tournament = Tournament.new
  end

  def create
    new_tournament = Tournament.new
    new_tournament.academy = Academy.find(params[:id])

    if new_tournament.save
      render json: { tournament: new_tournament }
    else
      render json: { errors: new_tournament.errors }, status: 422
    end
  end

  private

  def tournament_params
    params
      .permit(
        :belt,
        :weight,
        :start_date,
        :weight
      )
  end
end
