require 'rubygems'
require 'active_record'

ActiveRecord::Base.establish_connection :adapter => "sqlite3",
                                        :database => "../Tabelas.sqlite3"

ActiveRecord::Base.connection.create_table :agendamento do |t|
    t.datetime :data
    t.references :pacientes, foreign_key: true
    t.references :dentistas, foreign_key: true
    t.references :procedimentos, foreign_key: true
end