class Indicator < ApplicationRecord
    validates_uniqueness_of :name
    validates :name, presence: true, length: {minimum: 3, maximum: 20}
    validates :unit, presence: true, length: {maximum: 6}
end