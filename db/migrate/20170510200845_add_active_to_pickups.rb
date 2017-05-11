class AddActiveToPickups < ActiveRecord::Migration[5.0]
  def change
    add_column :pickups, :active, :boolean, default: true, null: false
  end
end
