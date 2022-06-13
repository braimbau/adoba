class AddMandatoryToIndicator < ActiveRecord::Migration[7.0]
  def change
    add_column :indicators, :mandatory, :boolean
  end
end
