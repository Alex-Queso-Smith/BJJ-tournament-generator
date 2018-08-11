Rails.application.routes.draw do
  root 'academies#index'
  devise_for :users

  resources :academies, only: [:index, :show, :new, :create, :update] do
    resources :tournaments, only: [:new, :create]
  end

  resources :tournaments, only: [:show] do
  end

  namespace :api do
    namespace :v1 do
      resources :academies, only: [:index, :show, :new, :create, :update] do
        resources :tournaments, only: [:new, :create]
      end
      resources :tournaments, only: [:show] do
        resources :tourney_rosters, only: [:create, :update, :destroy]
      end
    end
  end
end
