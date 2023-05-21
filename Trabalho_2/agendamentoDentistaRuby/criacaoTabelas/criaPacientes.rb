require 'rubygems'
require 'active_record'

ActiveRecord::Base.establish_connection :adapter => "sqlite3",
                                        :database => "../Tabelas.sqlite3"

ActiveRecord::Base.connection.create_table :pacientes do |t|
    t.string :nome
    t.string :sobrenome
    t.string :telefone
end