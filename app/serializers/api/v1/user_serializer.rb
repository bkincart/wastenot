class Api::V1::UserSerializer < ActiveModel::Serializer
  attributes :name, :address, :city, :state, :zip, :phone, :type

  has_many :inventories
  has_many :pickups
end
