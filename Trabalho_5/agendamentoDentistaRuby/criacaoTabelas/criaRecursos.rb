require 'rubygems'
require 'active_record'

ActiveRecord::Base.establish_connection :adapter => "sqlite3",
                                        :database => "../Tabelas.sqlite3"

ActiveRecord::Base.connection.create_table :recursos do |t|
    t.string :nome
    t.float :custo
    t.references :procedimentos, foreign_key: true
end