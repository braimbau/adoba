class IndicatorsController < ApplicationController
  def index
    render json: Indicator.all
  end

  def create
    indicator = Indicator.new(indicator_params)

    if indicator.save
      render json: indicator, status: :created
    else
      render json: indicator.errors, status: :unprocessable_entity
    end
  end

  def destroy
    Indicator.find(params[:id]).destroy!

    head :no_content
  end



  private

  def indicator_params
    params.require(:indicator).permit(:name, :unit, :mandatory)
  end

end
 