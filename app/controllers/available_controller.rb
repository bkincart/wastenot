class AvailableController < ApplicationController
  def index
    @available_inventories = Inventory.where(available: true, active: true)
  end
end
