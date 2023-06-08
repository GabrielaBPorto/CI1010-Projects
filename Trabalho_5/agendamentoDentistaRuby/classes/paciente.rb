require 'active_record'

ActiveRecord::Base.establish_connection(
  adapter: "sqlite3",
  database: "Tabelas.sqlite3"
)

class Paciente < ActiveRecord::Base
  has_many :agendamentos
end
