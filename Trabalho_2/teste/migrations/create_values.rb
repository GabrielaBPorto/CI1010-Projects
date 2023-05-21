require 'active_record'

class CreateValues < ActiveRecord::Migration[6.1]
  def change
    create_table :values do |t|
      t.float :taxes
      t.float :partial_value
      t.references :ingredient
      t.timestamps
    end
  end
end
