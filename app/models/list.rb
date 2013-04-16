class List < ActiveRecord::Base
  has_many :word_list_memberships
  has_many :words, :through => :word_list_memberships, :order => :position
end
