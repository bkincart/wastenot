class CreateInventories < ActiveRecord::Migration[5.0]
  def change
    create_table :inventories do |t|
      t.integer :quantity, null: false
      t.string :measurement
      t.string :item, null: false
      t.boolean :available, null: false, default: true

      t.belongs_to :user
      t.timestamps null: false
    end
  end
end
