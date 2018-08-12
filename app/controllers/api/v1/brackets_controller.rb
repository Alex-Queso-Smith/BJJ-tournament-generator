class Api::V1::BracketsController < ApiController
  def create

    tournament = Tournament.find(params[:tournament_id])
    bracket = Bracket.create(tournament: tournament)

    create_bracket(tournament, bracket)

    created_rounds_or_errors = create_rounds(params[:entrants], bracket)

    if created_rounds_or_errors && tournament.bracket2_id
      render json: {
        bracket: bracket,
        rounds: created_rounds_or_errors,
        bracket1_id: tournament.bracket1_id,
        bracket2_id: tournament.bracket2_id,
        current_bracket_id: tournament.current_bracket_id
       }
    elsif created_rounds_or_errors
      render json: {
        bracket: bracket,
        rounds: created_rounds_or_errors,
        bracket1_id: tournament.bracket1_id,
        current_bracket_id: tournament.current_bracket_id
       }
    else
      render json: { error: 'Creation Failed' }, status: 422
    end
  end

  def update

  end

  private

  def create_rounds(entrants, bracket)
    current_entrants = entrants
    rounds = []
    errors = []

    while current_entrants.length != 0 do
      first_e_ob = current_entrants[0]
      second_e_ob = current_entrants[1]
      first_entrant = ''
      second_entrant = ''

      if !first_e_ob[:nickname].nil?
        first_entrant = "#{first_e_ob[:first_name]} '#{first_e_ob[:nickname]}' #{first_e_ob[:last_name]}"
      else
        first_entrant = "#{first_e_ob[:first_name]} #{first_e_ob[:last_name]}"
      end

      if !second_e_ob[:nickname].nil?
        second_entrant = "#{second_e_ob[:first_name]} '#{second_e_ob[:nickname]}' #{second_e_ob[:last_name]}"
      else
        second_entrant = "#{second_e_ob[:first_name]} #{second_e_ob[:last_name]}"
      end

      new_round = Round.new(
        bracket: bracket,
        entrant1: first_entrant,
        entrant2: second_entrant
      )
      current_entrants.shift(2)

      if new_round.save
        rounds.push(new_round)
      else
        errors.push(new_round.errors)
      end
    end

    if errors.length == 0
      rounds
    else
      false
    end
  end

  def create_bracket(tournament, bracket)
    if !tournament.bracket1_id.nil?
      tournament.update(
        tournament_begun: true,
        bracket1_id: bracket.id,
        current_bracket_id: bracket.id)
    else
      tournament.update(
        bracket2_id: bracket.id,
        current_bracket_id: bracket.id
      )
    end
  end
end
