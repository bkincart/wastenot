class AddActiveToInventories < ActiveRecord::Migration[5.0]
  def change
    add_column :inventories, :active, :boolean, null: false, default: true
  end
end
