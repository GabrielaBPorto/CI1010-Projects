require 'active_record'

class CreateValuesIngredients < ActiveRecord::Migration
  def change
    create_table :values_ingredients do |t|
      t.references :value
      t.references :ingredient
      t.timestamps
    end
  end
end
