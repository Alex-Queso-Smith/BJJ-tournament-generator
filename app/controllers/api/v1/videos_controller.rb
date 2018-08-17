class Api::V1::VideosController < ApiController
  before_action :authenticate_user!

  def new
    new_video = YoutubeVideo.new
  end

  def create
    academy_id = Tournament.find(params[:tournament_id]).academy_id
    new_video = YoutubeVideo.new(video_id: params[:videoId], tournament: Tournament.find(params[:tournament_id]))

    if new_video.save
      render json: { message: "Entry successful", academy_id: academy_id }
    else
      render json: { errors: new_video.errors }, status: 422
    end
  end

  def destroy

  end
end
