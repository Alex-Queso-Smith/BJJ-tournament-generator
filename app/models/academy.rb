class Academy < ApplicationRecord
  validates :name, presence: true
  validates :address, presence: true
  validates :city, presence: true
  validates :state, presence: true
  validates :zipcode, presence: true

  belongs_to :user

  mount_uploader :academy_photo, AcademyPhotoUploader

  def name_with_address
    "#{self.name} - #{self.address}, #{self.city} #{self.state}"
  end
end
