require 'rubygems'
require 'active_record'

ActiveRecord::Base.establish_connection :adapter => "sqlite3",
                                        :database => "../Tabelas.sqlite3"

ActiveRecord::Base.connection.create_table :procedimentos do |t|
    t.string :nome
    t.integer :total_etapas
end