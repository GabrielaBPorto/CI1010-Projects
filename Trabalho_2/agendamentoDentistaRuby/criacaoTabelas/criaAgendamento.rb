require 'rubygems'
require 'active_record'

ActiveRecord::Base.establish_connection :adapter => "sqlite3",
                                        :database => "../Tabelas.sqlite3"

ActiveRecord::Base.connection.create_table :agendamentos do |t|
  t.datetime :data
  t.references :paciente, foreign_key: { to_table: :pacientes }
  t.references :dentista, foreign_key: { to_table: :dentistas }
  t.references :procedimento, foreign_key: { to_table: :procedimentos }
end
