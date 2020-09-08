class User < ApplicationRecord
    has_many :scores

    has_one_attached :avatar

end
