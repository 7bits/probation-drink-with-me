class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.integer :id
      t.text :session
      t.text :name

      t.timestamps
    end
  end
end
