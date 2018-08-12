class AddBracket3ToTournaments < ActiveRecord::Migration[5.2]
  def change
    add_column :tournaments, :bracket3_id, :integer, optional: true
  end
end
