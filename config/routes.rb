Rails.application.routes.draw do
  root 'academies#index'
  devise_for :users

  resources :academies, only: [:index, :new, :create]

  namespace :api do
    namespace :v1 do
      resources :academies, only: [:index, :new, :create]
    end
  end
end
