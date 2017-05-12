require 'net/http'
require 'json'
require 'uri'

class Api::V1::NearmeinventoriesController < ApplicationController
  def index
    Inventory.check_active

    # Figure out who current shelter user is and define their address for url
    shelter = current_user
    shelter_address_text = shelter.address + ' ' + shelter.city + ' ' + shelter.state + ' ' + shelter.zip
    shelter_address_words = shelter_address_text.split(' ')
    shelter_address_query = shelter_address_words.join('+')

    # Go through stores and define their address for url
    stores = User.where(type: 'Store')
    stores_within_five_miles = []
    stores.each do |store|
      store_address_text = store.address + ' ' + store.city + ' ' + store.state + ' ' + store.zip
      store_address_words = store_address_text.split(' ')
      store_address_query = store_address_words.join('+')

      # Reach out to GMaps API and grab distance, gather those within 5 miles
      distance_url = "https://maps.googleapis.com/maps/api/directions/json?origin=#{shelter_address_query}&destination=#{store_address_query}&key=#{ENV["GMAPS_DIRECTIONS_KEY"]}"
      distance_uri = URI(distance_url)
      response = Net::HTTP.get(distance_uri)
      workable_data = JSON.parse(response)
      distance_between = workable_data['routes'][0]['legs'][0]['distance']['value']
      if distance_between <= 8046
        stores_within_five_miles << store
      end
    end

    # Go through inventory from stores within 5 miles and see if active/available
    inventories_within_five_miles = []
    stores_within_five_miles.each do |store|
      store.inventories.each do |inventory|
        inventories_within_five_miles << inventory if inventory.active == true and inventory.available == true
      end
    end

    render json: inventories_within_five_miles
  end
end
