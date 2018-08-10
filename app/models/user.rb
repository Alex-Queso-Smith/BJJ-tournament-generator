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

  has_many :tourney_rosters
  has_many :tournaments, through: :tourney_rosters

end
