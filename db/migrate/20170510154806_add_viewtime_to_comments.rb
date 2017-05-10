class AddViewtimeToComments < ActiveRecord::Migration[5.0]
  def change
    add_column :comments, :viewtime, :string
  end
end
