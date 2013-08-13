class CreateSystems < ActiveRecord::Migration
  def change
    create_table :systems do |t|
      t.text :to
      t.text :message

      t.timestamps
    end
  end
end
