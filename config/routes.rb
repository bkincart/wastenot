Rails.application.routes.draw do
  devise_for :users
  root 'home#index'

  resources :users, only: :show do
    resources :pickups, only: :index
    resources :inventories, only: :index
    resources :past, only: :index
  end

  resources :inventories, only: [:index, :show]

  resources :stores, only: :index
  resources :shelters, only: :index
  resources :testimonials, only: :index

  namespace :api do
    namespace :v1 do
      resources :inventories
      resources :pickups
      resources :past, only: :index
    end
  end

  get '*path', to: 'home#index'
end
