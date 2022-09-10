class Blog < ApplicationRecord
  validates :title, presence: true, length: { maximum: 30 }
  validates :contents, presence: true, length: { maximum: 140}
  mount_uploader :image, ImageUploader
end
