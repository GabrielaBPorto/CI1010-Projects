require 'active_record'

class CreateRequests < ActiveRecord::Migration[6.1]
  def change
    create_table :requests do |t|
      t.string :requester
      t.string :type
      t.string :table
      t.timestamps
    end
  end
end
