class Api::V1::PastController < ApplicationController
  def index
    @user_id = current_user.id
    @inventories = Inventory.where(user_id: @user_id, active: false)
    render json: @inventories
  end
end
