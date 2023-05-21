require 'rubygems'
require 'active_record'

ActiveRecord::Base.establish_connection :adapter => "sqlite3",
                                        :database => "../Tabelas.sqlite3"

ActiveRecord::Base.connection.create_table :dentistas_procedimentos do |t|
    t.references :dentistas
    t.references :procedimentos
end