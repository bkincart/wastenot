class Pickup < ApplicationRecord
  belongs_to :store, foreign_key: 'store_id', class_name: 'User'
  belongs_to :shelter, foreign_key: 'shelter_id', class_name: 'User'
  belongs_to :inventory
end
