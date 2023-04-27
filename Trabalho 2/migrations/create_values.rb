require 'active_record'

class CreateValues < ActiveRecord::Migration
  def change
    create_table :values do |t|
      t.float :taxes
      t.float :partial_value
      t.references :ingredient
      t.timestamps
    end
  end
end
