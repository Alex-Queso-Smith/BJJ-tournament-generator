class AddCurrentBracketIdToTournaments < ActiveRecord::Migration[5.2]
  def change
    add_column :tournaments, :current_bracket_id, :integer, optional: true
  end
end
