class Api::V1::TourneyRostersController < ApiController
  def create

    new_tourney_roster = TourneyRoster.new(user: current_user, tournament: Tournament.find(params[:tournament_id]))
    
    if new_tourney_roster.save
      render json: { new_entrant: current_user }
    else
      render json: { errors: new_tourney_roster.errors }, status: 422
    end
  end

  def update

  end

  def destroy

  end

end
