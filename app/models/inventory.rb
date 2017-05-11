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

  # Iterate through active inventory and mark any not from today as inactive
  def self.check_active
    active_inventory= Inventory.where(active: true)
    active_inventory.each do |inventory|
      inventory.active = false if inventory.created_at.to_date != DateTime.now.to_date
      inventory.save
    end
  end
end
