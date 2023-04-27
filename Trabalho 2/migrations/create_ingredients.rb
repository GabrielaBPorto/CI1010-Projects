require 'active_record'

class CreateIngredients < ActiveRecord::Migration[6.1]
  def change
    create_table :ingredients do |t|
      t.string :type
      t.references :recipe
      t.timestamps
    end
  end
end
