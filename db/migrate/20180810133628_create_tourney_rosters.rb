class CreateTourneyRosters < ActiveRecord::Migration[5.2]
  def change
    create_table :tourney_rosters do |t|
      t.belongs_to :user
      t.belongs_to :tournament

      t.timestamps
    end
  end
end
