class AddStatusCollumnOnUser < ActiveRecord::Migration
  def change
  	add_column :users, :search, :boolean, :default => false
  end
end
