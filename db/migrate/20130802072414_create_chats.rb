class CreateChats < ActiveRecord::Migration
  def change
    create_table :chats do |t|
      t.text :from
      t.text :where
      t.text :message

      t.timestamps
    end
  end
end
