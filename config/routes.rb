Rails.application.routes.draw do
  devise_for :users
  root 'home#index'

  resources :users do
    resources :pickups
    resources :inventories
  end

  resources :stores, only: :index
  resources :shelters, only: :index
  resources :testimonials, only: :index

  namespace :api do
    namespace :v1 do
      resources :inventories
      resources :pickups
    end
  end

  get '*path', to: 'home#index'
end
