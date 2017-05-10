class Inventory < ApplicationRecord
  validates :quantity, numericality: { greater_than: 0 }
  validates :item, presence: true
  validates :available, inclusion: { in: [true, false] }
  validates :active, inclusion: { in: [true, false] }

  belongs_to :user
  has_many :comments
  belongs_to :pickup, optional: true

  def self.search(search)
    where("item ILIKE ?", "%#{search}%")
  end
end
