Rails.application.routes.draw do
  devise_for :users
  root 'home#index'

  resources :users, only: :show do
    resources :pickups, only: :index
    resources :inventories, only: :index
    resources :pastinventories, only: :index
    resources :pastpickups, only: :index
  end

  resources :inventories, only: [:index, :show]

  resources :available, only: :index
  resources :nearme, only: :index

  resources :stores, only: :index
  resources :shelters, only: :index
  resources :testimonials, only: :index
  resources :comments, only: [:edit]

  namespace :api do
    namespace :v1 do
      resources :inventories, except: [:new, :edit, :destroy]
      resources :pickups, except: [:show, :new, :edit]
      resources :pastinventories, only: :index
      resources :pastpickups, only: :index
      resources :comments, except: [:index, :new, :edit]
      resources :currentuser, only: :index
      resources :nearmeinventories, only: :index
      resources :availableinventories, only: :index
    end
  end

  get '*path', to: 'home#index'
end
