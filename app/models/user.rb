class User < ApplicationRecord
  before_validation :strip_phone

  def strip_phone
    if self.phone
      self.phone.gsub!(/\D/, '')
    end
  end

  validates :name, presence: true
  validates :address, presence: true
  validates :city, presence: true
  validates :state, inclusion: { in: STATES, message: 'can\'t be blank' }
  validates :zip, presence: true, numericality: true, length: { is: 5,
    message: 'must have a length of 5' }
  validates :phone, allow_blank: true, numericality: true, length: { in: 10..11 }
  validates :type, inclusion: { in: TYPES_COLLECTION,
    message: 'can\'t be blank' }
  validates :email, email: true,
    uniqueness: { message: "An account already exists for that email address!" }

  def store?
    self.type == 'Store'
  end

  def shelter?
    self.type == 'Shelter'
  end

  has_many :inventories
  has_many :comments
  has_many :stores, through: :store_pickups, source: :store
  has_many :store_pickups, foreign_key: :shelter_id, class_name: 'User'
  has_many :shelters, through: :shelter_pickups, source: :shelter
  has_many :shelter_pickups, foreign_key: :store_id, class_name: 'User'
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
end
