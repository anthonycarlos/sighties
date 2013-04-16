class CreateWordListMembership < ActiveRecord::Migration
  def up
    create_table "word_list_memberships" do |t|
      t.integer :word_id
      t.integer :list_id
      t.timestamps
    end
  end

  def down
    drop_table "word_list_memberships"
  end
end
