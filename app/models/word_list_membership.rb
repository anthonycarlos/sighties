class WordListMembership < ActiveRecord::Base
  belongs_to :word
  belongs_to :list

  def name
    self.word.name
  end
end
