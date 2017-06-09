class CreateMolecules < ActiveRecord::Migration[5.1]
  def change
    create_table :molecules do |t|
      t.string :atom1
      t.string :atom2
      t.float :energy
      t.integer :bonds
    end
  end
end
