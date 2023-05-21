require 'active_record'

class CreateIngredientsRecipes < ActiveRecord::Migration[6.1]
  def change
    create_table :ingredients_recipes do |t|
      t.references :ingredient
      t.references :recipe
      t.timestamps
    end
  end
end
