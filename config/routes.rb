Rails.application.routes.draw do
  root 'academies#index'
  devise_for :users

  resources :academies, only: [:index, :show, :new, :create, :update]

  namespace :api do
    namespace :v1 do
      resources :academies, only: [:index, :show, :new, :create, :update]
    end
  end
end
