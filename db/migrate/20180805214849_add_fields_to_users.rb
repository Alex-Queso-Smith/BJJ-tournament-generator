class AddFieldsToUsers < ActiveRecord::Migration[5.2]
  def change
    change_table :users do |t|
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :belt, null: false
      t.string :nickname
      t.string :stripes
    end
  end
end
