Rails.application.routes.draw do
  resources :collections, only: [:index, :create]
  resources :indicators, only: [:index, :create, :destroy]
end
