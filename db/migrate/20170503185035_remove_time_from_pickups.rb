class RemoveTimeFromPickups < ActiveRecord::Migration[5.0]
  def up
    remove_column :pickups, :time
  end
  def down
    add_column :pickups, :time, :time
  end
end
