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
  validates :state, inclusion: { in: STATES }
  validates :zip,  numericality: true, length: { is: 5 }
  validates :phone,  numericality: true, length: { in: 10..11}, allow_nil: true
  validates :type, inclusion: { in: ['store', 'shelter'] }
  validates :email, presence: true, email: true,
    uniqueness: { message: "An account already exists for that email address!" }
  validates :encrypted_password, presence: true

  def store?
    self.type == 'store'
  end

  def shelter?
    self.type == 'shelter'
  end
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
end
