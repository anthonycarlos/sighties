class AddPositionToWordListMemberships < ActiveRecord::Migration
  def change
    add_column :word_list_memberships, :position, :integer
  end
end
