class Api::V1::InventoriesController < ApplicationController
  skip_before_filter :verify_authenticity_token

  def index
    @user_id = current_user.id
    @inventories = Inventory.where(user_id: @user_id, active: true)
    render json: @inventories
  end

  def show
    @inventory = Inventory.find(params[:id])
    render json: @inventory
  end

  def create
    body = request.body.read
    parsed = JSON.parse(body)
    parsed["item"] = parsed["item"].gsub(/^([a-z])/) { $1.capitalize }
    parsed["measurement"] = parsed["measurement"].gsub(/^([a-z])/) { $1.capitalize }
    inventory = Inventory.new(parsed)
    inventory.user = current_user
    if inventory.save
      render json: { messages: 'You succeeded!'}
    else
      render json: { messages: inventory.errors.full_messages }
    end
  end
end
