class PostSerializer < ActiveModel::Serializer
  attributes :id, :content, :image, :created_at
  belongs_to :user
end
