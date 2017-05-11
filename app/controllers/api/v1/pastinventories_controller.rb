class Api::V1::PastinventoriesController < ApplicationController
  def index
    Inventory.check_active

    @user_id = current_user.id
    @past_inventories = Inventory.where(user_id: @user_id, active: false)
    render json: @past_inventories
  end
end
