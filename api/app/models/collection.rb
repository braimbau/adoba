class Collection < ApplicationRecord
    validates :organization, presence: true
end
