class AddTypeToSystem < ActiveRecord::Migration
  def change
    add_column :systems, :type, :text
  end
end
