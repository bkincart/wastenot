Rails.application.routes.draw do
  devise_for :users
  root 'home#index'

  resources :users, only: :show do
    resources :pickups, only: :index
    resources :inventories, only: :index
    resources :past, only: :index
  end

  resources :inventories, only: [:index, :show]

  resources :available, only: :index

  resources :stores, only: :index
  resources :shelters, only: :index
  resources :testimonials, only: :index
  resources :comments, only: [:edit, :destroy]

  namespace :api do
    namespace :v1 do
      resources :inventories, except: [:new, :edit, :destroy]
      resources :pickups, except: [:show, :new, :edit]
      resources :past, only: :index
      resources :comments, except: [:index, :new, :edit]
      resources :currentuser, only: :index
    end
  end

  get '*path', to: 'home#index'
end
