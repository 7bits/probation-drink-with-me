class AddFromFieldSystems < ActiveRecord::Migration
  def change
    add_column :systems, :from, :text
  end
end
