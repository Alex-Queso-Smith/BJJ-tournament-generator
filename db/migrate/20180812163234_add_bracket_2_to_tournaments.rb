class AddBracket2ToTournaments < ActiveRecord::Migration[5.2]
  def change
    add_column :tournaments, :bracket2_id, :integer, optional: true
  end
end
