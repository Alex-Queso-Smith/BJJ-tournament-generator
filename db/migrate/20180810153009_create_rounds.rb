class CreateRounds < ActiveRecord::Migration[5.2]
  def change
    create_table :rounds do |t|
      t.string :entrant1, null: false
      t.string :entrant2, null: false
      t.string :winner
      
      t.belongs_to :bracket

      t.timestamps
    end
  end
end
