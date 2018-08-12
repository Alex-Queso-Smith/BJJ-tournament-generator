class Api::V1::TourneyRostersController < ApiController
  def create

    new_tourney_roster = TourneyRoster.new(user: current_user, tournament: Tournament.find(params[:tournament_id]))

    if new_tourney_roster.save
      render json: { new_entrant: current_user, roster_id: new_tourney_roster.id }
    else
      render json: { errors: new_tourney_roster.errors }, status: 422
    end
  end

  def destroy
    roster_to_destroy = TourneyRoster.find(params[:id])

    if roster_to_destroy.destroy
      render json: { body: 'Deleted Successfully' }
    else
      render json: { error: 'Delete Failed' }, status: 422
    end
  end

end