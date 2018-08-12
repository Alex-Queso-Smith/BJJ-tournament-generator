class AddBracket1ToTournaments < ActiveRecord::Migration[5.2]
  def change
    add_column :tournaments, :bracket1_id, :integer, optional: true
  end
end
