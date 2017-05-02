class Inventory < ApplicationRecord
  validates :quantity, numericality: { greater_than: 0 }
  validates :item, presence: true
  validates :available, inclusion: { in: [true, false] }

  belongs_to :user
  has_many :comments
end
