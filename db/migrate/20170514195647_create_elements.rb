class CreateElements < ActiveRecord::Migration[5.1]
  def change
    create_table :elements do |t|
      t.string :name
      t.string :symbol
      t.integer :atomic_number

      t.timestamps
    end
  end
end
