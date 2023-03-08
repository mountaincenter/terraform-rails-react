class PostsController < ApplicationController
  before_action :set_post, only: %i[show destroy]

  def index
    posts = Post.order(created_at: :desc).limit(20)
    render json: posts
  end

  def show
    render json: @post
  end

  def create
    post = Post.new(post_params)
    if post.save
      render json: post
    else
      render json: { errors: post.errors }
    end
  end

  def destroy
    @post.destroy
    render json: @post
  end

  private

    def set_post
      @post = Post.find(params[:id])
    end

    def post_params
      params.permit(:content, :image, :user_id)
    end
end
