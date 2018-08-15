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

  def instructor
    self.user
  end

  def students
    User.where(academy_id: self.id)
  end

  def white_belts
    User.where(academy_id: self.id, belt: "White")
  end

  def blue_belts
    User.where(academy_id: self.id, belt: "Blue")
  end

  def purple_belts
    User.where(academy_id: self.id, belt: "Purple")
  end

  def brown_belts
    User.where(academy_id: self.id, belt: "Brown")
  end

  def black_belts
    User.where(academy_id: self.id, belt: "Black")
  end

  def open_tournaments
    Tournament.where(academy_id: self.id, finished: false)
  end

  def closed_tournaments
    Tournament.where(academy_id: self.id, finished: true)
  end
end
