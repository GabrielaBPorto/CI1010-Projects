require 'active_record'

ActiveRecord::Base.establish_connection(
  adapter: "sqlite3",
  database: "Tabelas.sqlite3"
)

class Agendamento < ActiveRecord::Base
  self.table_name = 'agendamentos'
  belongs_to :paciente
  has_one :procedimento
  has_many :dentistas
end

