require 'active_record'

class CreateRecipes < ActiveRecord::Migration
  def change
    create_table :recipes do |t|
      t.string :name
      t.integer :avg_time
      t.string :type
      t.timestamps
    end
  end
end
