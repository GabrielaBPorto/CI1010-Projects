require 'active_record'

ActiveRecord::Base.establish_connection(
  adapter: "sqlite3",
  database: "Tabelas.sqlite3"
)

class Agendamento < ActiveRecord::Base
  self.table_name = 'agendamentos'
  has_one :procedimentos
  has_one :pacientess
  has_many :dentistas
end
