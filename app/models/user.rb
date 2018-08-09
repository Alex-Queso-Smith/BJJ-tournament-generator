class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  validates :email, uniqueness: true
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :belt, presence: true

  mount_uploader :profile_photo, ProfilePhotoUploader

  belongs_to :academy, optional: true

  def name_with_nickname
    "#{self.first_name} '#{self.nickname}' #{self.last_name}"
  end
end
