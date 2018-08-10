class CreateTournaments < ActiveRecord::Migration[5.2]
  def change
    create_table :tournaments do |t|
      t.string :belt, null: false
      t.string :start_date, null: false
      t.boolean :finished, default: false
      t.string :winner
      t.string :weight

      t.belongs_to :academy

      t.timestamps
    end
  end
end
