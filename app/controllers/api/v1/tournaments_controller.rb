class Api::V1::TournamentsController < ApiController
  before_action :authenticate_user!, except: [:show]

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
    users = tournament.users
    entrants = Tournament.new.sort_entrant_names(users)

    if user_signed_in?
      user = current_user
      current_user_academy_id = user.academy_id
      name = user.name_with_nickname
      instructor_status = user.instructor?
      user_id = user.id
      admin_status = user.admin?
    end

    if TourneyRoster.find_by(tournament: tournament, user: current_user)
      roster_id = TourneyRoster.find_by(tournament: tournament, user: current_user).id
    end

    user_entered = false
    user_entered = true if roster_id

    new_info = Tournament.new.handle_tournament_advancement(tournament)

    render json: {
      tournament: tournament,
      current_user_id: user_id,
      current_user_academy_id: current_user_academy_id,
      user_entered: user_entered,
      name: name,
      entrants: entrants,
      roster_id: roster_id,
      instructor_status: instructor_status,
      admin_status: admin_status,
      initial_rounds: new_info["initial_rounds"],
      bracket1_winners: new_info["bracket1_winners"],
      bracket2_rounds: new_info["bracket2_rounds"],
      bracket2_winners: new_info["bracket2_winners"],
      bracket3_round: new_info["bracket3_round"],
      bracket3_winner: new_info["bracket3_winner"],
      bracket1_finished: new_info["bracket1_finished"],
      bracket2_finished: new_info["bracket2_finished"],
      bracket3_finished: new_info["bracket3_finished"]
       }
  end

  def destroy
    tournament = Tournament.find(params[:id])

    if tournament.destroy
      render json: { message: "Delete Successful" }
    else
      render json: { errors: tournament.errors }, status: 422
    end
  end

  def update;end

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
