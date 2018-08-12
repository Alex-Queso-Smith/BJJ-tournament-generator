class AddTournamentBegunToTournaments < ActiveRecord::Migration[5.2]
  def change
    add_column :tournaments, :tournament_begun, :boolean, default: false
  end
end
