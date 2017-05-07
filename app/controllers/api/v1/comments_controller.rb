class Api::V1::CommentsController < ApplicationController
  skip_before_filter :verify_authenticity_token

  def create
    body = request.body.read
    parsed = JSON.parse(body)
    comment = Comment.new(parsed)
    comment.user = current_user
    comment.user_name = current_user.name
    if comment.save
      render json: { messages: 'Success' }
    else
      render json: { messages: comment.errors.full_messages }
    end
  end
end
