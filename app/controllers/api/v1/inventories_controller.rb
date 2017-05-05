class Api::V1::InventoriesController < ApplicationController
  def index
    @user_id = current_user.id
    render json:
      {
        inventories: Inventory.where(user_id: @user_id, active: true)
      }
  end

  def show
    @inventory = Inventory.find(params[:id])
    render json: @inventory
  end

  def new
    @inventory = Inventory.new
  end

  def create
    @inventory.item = strong_params[:item].gsub(/^([a-z])/) { $1.capitalize }
  end
end
