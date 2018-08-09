class AddPhotoToAcademy < ActiveRecord::Migration[5.2]
  def change
    add_column :academies, :academy_photo, :string
  end
end
