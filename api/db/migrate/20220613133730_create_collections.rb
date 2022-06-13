class CreateCollections < ActiveRecord::Migration[7.0]
  def change
    create_table :collections do |t|
      t.string :organization
      t.date :date

      t.timestamps
    end
  end
end
