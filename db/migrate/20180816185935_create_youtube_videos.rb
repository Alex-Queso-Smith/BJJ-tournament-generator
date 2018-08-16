class CreateYoutubeVideos < ActiveRecord::Migration[5.2]
  def change
    create_table :youtube_videos do |t|
      t.string :video_id, null: false

      t.belongs_to :tournament
    end
  end
end
