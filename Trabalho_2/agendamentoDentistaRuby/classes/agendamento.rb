require 'active_record'

ActiveRecord::Base.establish_connection(
  adapter: "sqlite3",
  database: "Tabelas.sqlite3"
)

class Agendamento < ActiveRecord::Base
  self.table_name = 'agendamentos'
  has_one :procedimento
  has_one :paciente, foreign_key: 'paciente_id'
  has_many :dentistas
end

