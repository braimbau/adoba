class CollectionsController < ApplicationController
  def index
    render json: Collection.all
  end

  def create
    collection = Collection.new(collection_params)

    if collection.save
      render json: collection, status: :created
    else
      render json: collection.errors, status: :unprocessable_entity
    end
  end


  private

  def collection_params
    params.require(:collection).permit(:organization, :date, indicators: [])
  end
end
