class InventoriesController < ApplicationController
  def index
    @inventories = Inventory.all
    if params[:search]
      @inventories = Inventory.search(params[:search]).order("created_at DESC")
    else
      @inventories = Inventory.all.order("created_at DESC")
    end
  end

  def show; end
end
