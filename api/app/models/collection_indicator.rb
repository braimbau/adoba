class CollectionIndicator < ApplicationRecord
  belongs_to :indicator
  belongs_to :collection
end
