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

    bracket1_id = tournament.bracket1_id
    bracket1_winners = []

    if bracket1_id
      initial_rounds = Bracket.find(bracket1_id).rounds.sort
      bracket1_finished = Bracket.find(bracket1_id).finished
    end

    bracket1_winners = Bracket.new.determine_bracket_winners(initial_rounds) if initial_rounds

    bracket2_id = tournament.bracket2_id
    bracket2_winners = []

    if bracket2_id
      bracket2_rounds = Bracket.find(bracket2_id).rounds.sort
      bracket2_finished = Bracket.find(bracket2_id).finished
    end

    bracket2_winners = Bracket.new.determine_bracket_winners(bracket2_rounds) if bracket2_rounds

    bracket3_id = tournament.bracket3_id
    bracket3_winner = []

    if bracket3_id
      bracket3_round = Bracket.find(bracket3_id).rounds.sort
      bracket3_finished = Bracket.find(bracket3_id).finished
    end

    bracket3_winner = Bracket.new.determine_bracket_winners(bracket3_round) if bracket3_round

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
      initial_rounds: initial_rounds,
      bracket1_winners: bracket1_winners,
      bracket2_rounds: bracket2_rounds,
      bracket2_winners: bracket2_winners,
      bracket3_round: bracket3_round,
      bracket3_winner: bracket3_winner,
      bracket1_finished: bracket1_finished,
      bracket2_finished: bracket2_finished,
      bracket3_finished: bracket3_finished
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
