Rails.application.routes.draw do
  root 'academies#index'
  devise_for :users

  resources :academies, only: [:index, :show, :new, :create, :update] do
    resources :tournaments, only: [:new, :create]
  end

  namespace :api do
    namespace :v1 do
      resources :academies, only: [:index, :show, :new, :create, :update] do
        resources :tournaments, only: [:new, :create]
      end
    end
  end
end
