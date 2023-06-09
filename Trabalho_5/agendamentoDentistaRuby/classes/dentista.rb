require 'active_record'

ActiveRecord::Base.establish_connection(
  adapter: "sqlite3",
  database: "Tabelas.sqlite3"
)

class Dentista < ActiveRecord::Base
  self.table_name = 'dentista'
  has_and_belongs_to_many :procedimentos, -> { uniq }
  belongs_to :agendamentos
end
