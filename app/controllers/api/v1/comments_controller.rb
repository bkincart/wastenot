class Api::V1::InventoriesController < ApplicationController
  skip_before_filter :verify_authenticity_token

  def create
    body = request.body.read
    parsed = JSON.parse(body)
    comment = Comment.new(parsed)
    binding.pry
    inventory.user = current_user
    if inventory.save
      render json: { messages: 'You succeeded!'}
    else
      render json: { messages: inventory.errors.full_messages }
    end
  end
end
