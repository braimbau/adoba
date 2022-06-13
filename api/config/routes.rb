Rails.application.routes.draw do
  resources :indicators, only: [:index, :create, :destroy]
end
