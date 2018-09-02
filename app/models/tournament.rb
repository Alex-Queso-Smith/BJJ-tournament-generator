class Tournament < ApplicationRecord
  validates :belt, presence: true
  validates :start_date, presence: true
  validates :gender, presence: true
  belongs_to :academy

  has_many :tourney_rosters, dependent: :destroy
  has_many :users, through: :tourney_rosters

  has_many :brackets, dependent: :destroy
  has_many :youtube_videos, dependent: :destroy

  def sort_entrant_names(entrants)
    name_entrants = []
    if entrants.length != 0
      entrants.each do |entrant|
        name_entrants << entrant.name_with_nickname
      end
    end
    name_entrants
  end

  def handle_tournament_advancement(tournament)
    tournament_info = {}

    bracket1_id = tournament.bracket1_id
    tournament_info["bracket1_winners"] = []

    if bracket1_id
      tournament_info["initial_rounds"] = Bracket.find(bracket1_id).rounds.sort
      tournament_info["bracket1_finished"] = Bracket.find(bracket1_id).finished
    end

    if tournament_info["initial_rounds"]
      tournament_info["bracket1_winners"] = Bracket.new.determine_bracket_winners(tournament_info["initial_rounds"])
    end

    bracket2_id = tournament.bracket2_id
    tournament_info["bracket2_winners"] = []

    if bracket2_id
      tournament_info["bracket2_rounds"] = Bracket.find(bracket2_id).rounds.sort
      tournament_info["bracket2_finished"] = Bracket.find(bracket2_id).finished
    end

    if tournament_info["bracket2_rounds"]
      tournament_info["bracket2_winners"] = Bracket.new.determine_bracket_winners(tournament_info["bracket2_rounds"])
    end

    bracket3_id = tournament.bracket3_id
    tournament_info["bracket3_winner"] = []

    if bracket3_id
      tournament_info["bracket3_round"] = Bracket.find(bracket3_id).rounds.sort
      tournament_info["bracket3_finished"] = Bracket.find(bracket3_id).finished
    end

    if tournament_info["bracket3_round"]
      tournament_info["bracket3_winner"] = Bracket.new.determine_bracket_winners(tournament_info["bracket3_round"])
    end

    return tournament_info
  end
end
