class AddIndicatorsToCollection < ActiveRecord::Migration[7.0]
  def change
    add_column :collections, :indicators, :text, array:true, default: []
  end
end
