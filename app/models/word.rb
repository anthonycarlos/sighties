class Word < ActiveRecord::Base
  attr_accessible :name
  has_many :word_list_memberships
end
