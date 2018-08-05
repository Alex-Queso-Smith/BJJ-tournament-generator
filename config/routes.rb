Rails.application.routes.draw do
  root 'academies#index'
  devise_for :users

  resources :academies, only: [:index]
end
