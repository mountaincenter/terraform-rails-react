Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth', controllers: {
    registrations: 'auth/registrations'
  }
  namespace :auth do
    resources :sessions, only: %[index]
  end
  root to:"home#index"
  get  'home/index'
  resources :blogs
  resources :posts, only: %i[index create destroy]
end
