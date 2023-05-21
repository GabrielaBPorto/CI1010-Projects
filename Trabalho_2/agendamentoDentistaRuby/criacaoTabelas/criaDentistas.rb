require 'rubygems'
require 'active_record'

ActiveRecord::Base.establish_connection :adapter => "sqlite3",
                                        :database => "../Tabelas.sqlite3"

ActiveRecord::Base.connection.create_table :dentistas do |t|
    t.string :nome
    t.float :custo_por_procedimentos
    t.string :telefone
end