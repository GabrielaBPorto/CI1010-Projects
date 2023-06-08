require 'active_record'

class CreateValuesIngredients < ActiveRecord::Migration[6.1]
  def change
    create_table :values_ingredients do |t|
      t.references :value
      t.references :ingredient
      t.timestamps
    end
  end
end
