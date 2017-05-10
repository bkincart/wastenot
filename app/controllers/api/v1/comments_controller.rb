class Api::V1::CommentsController < ApplicationController
  skip_before_filter :verify_authenticity_token

  def show
    @comment = Comment.find(params[:id])
    render json: @comment
  end

  def create
    body = request.body.read
    parsed = JSON.parse(body)
    @comment = Comment.new(parsed)
    @current_user = current_user
    @comment.user = @current_user
    @comment.user_name = @current_user.name
    if @comment.save
      @comment.viewtime = @comment.updated_at.strftime('%b %d, %Y at %I:%M %p')
      @comment.save
      render json: { messages: 'Success', comment: @comment }
    else
      render json: { messages: @comment.errors.full_messages }
    end
  end

  def update
    body = request.body.read
    parsed = JSON.parse(body)
    comment = Comment.find(parsed['id'])
    comment.body = parsed['body']
    if comment.save
      render json: { messages: 'Success', inventory_id: comment.inventory_id }
    else
      render json: { messages: comment.errors.full_messages }
    end
  end

  def destroy
    body = request.body.read
    parsed = JSON.parse(body)
    comment = Comment.find(parsed['id'])
    comment.destroy
    render json: { message: 'Success' }
  end
end
