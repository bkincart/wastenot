class Api::V1::InventoriesController < ApplicationController
  skip_before_filter :verify_authenticity_token

  def index
    Inventory.check_active
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
    # Prepare store address for geocoding
    # store = @inventory.user
    # store_address_text = store.address + ' ' + store.city + ' ' + store.state + ' ' + store.zip
    # store_address_words = store_address_text.split(' ')
    # store_address_url = store_address_words.join('+')
    # # Grab latitude and longitude from Gmaps Geocoding API
    # store_url = "https://maps.googleapis.com/maps/api/geocode/json?address=#{store_address_url}&key=#{ENV["GMAPS_DIRECTIONS_KEY"]}"
    # store_uri = URI(store_url)
    # response = Net::HTTP.get(store_uri)
    # workable_data = JSON.parse(response)
    # latitude = workable_data['results'][0]['geometry']['location']['lat']
    # longitude = workable_data['results'][0]['geometry']['location']['lng']

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
