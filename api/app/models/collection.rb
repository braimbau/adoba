class Collection < ApplicationRecord
    validates :organization, presence: true
    has_many :collection_indicators
end
