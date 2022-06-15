class CollectionsController < ApplicationController
  def index
    render json: Collection.all, :include => [:collection_indicators]
  end

  def create
    collection = Collection.new(collection_params)
  
    for indicator in params[:indicators]
      indicatorCollection = CollectionIndicator.new()
      indicatorCollection.indicator = Indicator.find(indicator['id'])
      indicatorCollection.collection = collection
      indicatorCollection.save!
    end
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
