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

    initial_rounds = false
    bracket1_id = tournament.bracket1_id
    bracket1_winners = []

    if bracket1_id
      initial_rounds = Bracket.find(bracket1_id).rounds.sort
    end

    if initial_rounds
      bracket1_winners = determine_bracket_winners(initial_rounds)
    end

    bracket2_rounds = false
    bracket2_id = tournament.bracket2_id
    bracket2_winners = []

    if bracket2_id
      bracket2_rounds = Bracket.find(bracket2_id).rounds.sort
    end

    if bracket2_rounds
      bracket2_winners = determine_bracket_winners(bracket2_rounds)
    end

    bracket3_round = false
    bracket3_id = tournament.bracket3_id
    bracket3_winner = []

    if bracket3_id
      bracket3_round = Bracket.find(bracket3_id).rounds.sort
    end

    if bracket3_round
      bracket3_winner = determine_bracket_winners(bracket3_round)
    end

    render json: {
      tournament: tournament,
      current_user_id: current_user.id,
      entrants: entrants,
      roster_id: roster_id,
      instructor_status: current_user.instructor?,
      initial_rounds: initial_rounds,
      bracket1_winners: bracket1_winners,
      bracket2_rounds: bracket2_rounds,
      bracket2_winners: bracket2_winners,
      bracket3_round: bracket3_round,
      bracket3_winner: bracket3_winner
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

  def determine_bracket_winners(rounds)
    winners = []

    rounds.each do |round|
      if round.winner
        winners.push(round.winner)
      end
    end
    winners
  end

end
