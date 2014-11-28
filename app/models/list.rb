class List < ActiveRecord::Base
  has_many :word_list_memberships
  has_many :words, :through => :word_list_memberships, :order => :position

  def add_word_to_end(new_word_name)
    wlm = self.word_list_memberships.new
    max_pos = self.word_list_memberships.maximum(:position) || 0
    new_word = Word.new(:name => new_word_name)
    wlm.word = new_word
    wlm.position = max_pos + 1
    new_word.save!
    wlm.save!
    wlm
  end

end
