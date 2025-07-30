# frozen_string_literal: true

namespace :api, defaults: { format: :json } do
  namespace :v1 do
    devise_scope :user do
      post "login", to: "sessions#create", as: "login"
      delete "logout", to: "sessions#destroy", as: "logout"
    end

    resource :organization, only: [:show, :update]

    resources :users, only: [:show, :create, :update, :destroy], constraints: { id: /.*/ }

    resources :quizzes, only: [:index, :show, :create, :update], param: :slug do
      resources :questions, only: [:index, :show, :create, :update] do
        member do
          post :clone, to: "questions/clone#create"
        end
        collection do
          post "bulk_destroy"
        end
      end

      collection do
        post "draft/discard", to: "quizzes/drafts#discard"
      end

      collection do
        post :bulk_destroy
        put :bulk_update, to: "quizzes/bulk_update#update"
      end

      member do
        post "clone", to: "quizzes/clone#create"
      end
    end

    namespace :public do
      resources :quizzes, param: :slug, only: [:index, :show] do
        resource :report, only: %i[create], module: :quizzes do
          get :download, on: :collection
        end
        resources :attempts, only: [:index, :show, :create, :update] do
          collection do
            post :bulk_destroy
          end
        end
      end
    end
  end
end
