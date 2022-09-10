class BlogsController < ApplicationController
  def index
    blogs = Blog.all
    render json:blogs
  end

  def show
    blog = Blog.find(params[:id])
    render json: blog
  end

  def create
    Blog.create(blog_params)
    head :created
  end

  def update
    blog = Blog.find(params[:id])
    if blog.update(blog_paramas)
      render json: blog
    else
      render json: blog.errors, status: 422
    end
  end

  def destroy
    blog = Blog.find(params[:id])
    blog.destroy
    render json: blog
  end

  private

  def blog_params
    params.require(:blog).permit(:title, :contents, :image)
  end
end
