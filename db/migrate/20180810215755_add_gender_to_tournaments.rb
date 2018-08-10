class AddGenderToTournaments < ActiveRecord::Migration[5.2]
  def change
    add_column :tournaments, :gender, :string, null: false
  end
end
