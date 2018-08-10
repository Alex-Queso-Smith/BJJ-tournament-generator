class CreateBrackets < ActiveRecord::Migration[5.2]
  def change
    create_table :brackets do |t|
      t.boolean :finished, default: false

      t.belongs_to :tournament

      t.timestamps
    end
  end
end
