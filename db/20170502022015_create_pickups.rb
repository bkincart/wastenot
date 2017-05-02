class CreatePickups < ActiveRecord::Migration[5.0]
  def change
    create_table :pickups do |t|
      t.datetime :time, null: false

      t.belongs_to :user
      t.belongs_to :inventory
      t.timestamps
    end
  end
end
