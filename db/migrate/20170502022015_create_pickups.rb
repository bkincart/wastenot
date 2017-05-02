class CreatePickups < ActiveRecord::Migration[5.0]
  def change
    create_table :pickups do |t|
      t.time :time, null: false

      t.belongs_to :shelter
      t.belongs_to :store
      t.belongs_to :inventory
      t.timestamps null: false
    end
  end
end
