class AddReadColumnSystem < ActiveRecord::Migration
  def change
  	add_column :systems, :read, :boolean, :default => false
  end
end
