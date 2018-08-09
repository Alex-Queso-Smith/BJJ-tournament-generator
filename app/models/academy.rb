class Academy < ApplicationRecord
  validates :name, presence: true
  validates :address, presence: true
  validates :city, presence: true
  validates :state, presence: true
  validates :zipcode, presence: true

  belongs_to :user

  mount_uploader :academy_photo, AcademyPhotoUploader
end
