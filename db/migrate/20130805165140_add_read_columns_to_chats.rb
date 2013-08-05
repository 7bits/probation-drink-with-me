class AddReadColumnsToChats < ActiveRecord::Migration
  def change
  	add_column :chats, :read, :boolean
  end
end
