Rails.application.routes.draw do
  root 'academies#index'
  devise_for :users

  resources :academies, only: [:index, :show, :new, :create, :update] do
    resources :tournaments, only: [:new, :create]
  end

  resources :tournaments, only: [:show] do
    resources :brackets, only: [:create, :update]
  end

  namespace :api do
    namespace :v1 do
      resources :academies, only: [:index, :show, :new, :create, :update] do
        resources :tournaments, only: [:new, :create]
      end
      resources :tournaments, only: [:show, :update] do
        resources :brackets, only: [:create, :update]
        resources :tourney_rosters, only: [:create, :update]
      end
      resources :tourney_rosters, only: [:destroy]
      resources :rounds, only: [:update]
    end
  end
end
