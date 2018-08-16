class TournamentSerializer < ActiveModel::Serializer
  attributes :id,
    :belt,
    :start_date,
    :finished,
    :winner,
    :weight,
    :academy_id,
    :gender,
    :tournament_begun,
    :bracket1_id,
    :bracket2_id,
    :bracket3_id,
    :current_bracket_id

    has_many :youtube_videos
end
