class CreateAcademies < ActiveRecord::Migration[5.2]
  def change
    create_table :academies do |t|
      t.string :name, null: false
      t.string :address, null: false
      t.string :city, null: false
      t.string :state, null: false
      t.string :zipcode, null: false
      t.string :website

      t.belongs_to :user, null: false

      t.timestamps null: false
    end
  end
end
