class AddPickupToInventories < ActiveRecord::Migration[5.0]
  def change
    add_column :inventories, :pickup_id, :integer
  end
end
