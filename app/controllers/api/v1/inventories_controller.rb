class Api::V1::InventoriesController < ApplicationController
  # def index
  #   respond_with Inventory.all
  # end

  def show
    @inventory = Inventory.find(params[:id])
    @store = @inventory.user
    render json:
      {
        inventory: @inventory,
        store: @store,
        comments: @inventory.comments
      }
  end

  def new
    @inventory = Inventory.new
  end

  def create
    @inventory.item = strong_params[:item].gsub(/^([a-z])/) { $1.capitalize }
  end
end
