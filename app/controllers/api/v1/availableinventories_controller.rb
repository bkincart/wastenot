class Api::V1::AvailableinventoriesController < ApplicationController
  def index
    Inventory.check_active

    @available_inventories= Inventory.where(active: true, available: true)
    render json: @available_inventories
  end
end
