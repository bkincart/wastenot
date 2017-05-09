class Api::V1::InventorySerializer < ActiveModel::Serializer
  attributes :id, :quantity, :measurement, :item, :available, :active, :user_id

  belongs_to :user
  has_many :comments
  belongs_to :pickup
end
