class Api::V1::InventoriesController < ApplicationController
  skip_before_filter :verify_authenticity_token

  def index
    # Iterate through active inventory and mark any not from today as inactive
    active_inventory = Inventory.where(active: true)
    active_inventory.each do |inventory|
      inventory.active = false if inventory.created_at.to_date != DateTime.now.to_date
      inventory.save
    end
    # Pull inventory for this user that is active
    @user_id = current_user.id
    @active_inventories = Inventory.where(user_id: @user_id, active: true)
    render json: @active_inventories
  end

  def show
    @inventory = Inventory.find(params[:id])
    # Make sure inventory is not active if it is not from today
    @inventory.active = false if @inventory.created_at.to_date != DateTime.now.to_date
    @inventory.save
    # Serve up that inventory item
    render json: @inventory
  end

  def create
    @current_user = current_user
    body = request.body.read
    parsed = JSON.parse(body)
    parsed["item"] = parsed["item"].gsub(/^([a-z])/) { $1.capitalize }
    parsed["measurement"] = parsed["measurement"].gsub(/^([a-z])/) { $1.capitalize }
    inventory = Inventory.new(parsed)
    inventory.user = current_user
    if inventory.save
      render json: { messages: 'Success', current_user: @current_user }
    else
      render json: { messages: inventory.errors.full_messages }
    end
  end

  def update
    body = request.body.read
    parsed = JSON.parse(body)
    inventory = Inventory.find(parsed['id'])
    inventory.available = !inventory.available
    if inventory.save
      render json: { messages: 'Success', new_availability: inventory.available }
    else
      render json: { messages: 'Failure' }
    end
  end
end
