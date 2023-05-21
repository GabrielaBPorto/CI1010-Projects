require 'active_record'

class CreateRecipesRequests < ActiveRecord::Migration[6.1][6.1]
  def change
    create_table :recipes_requests do |t|
      t.references :recipe
      t.references :request
      t.timestamps
    end
  end
end
