require 'active_record'

ActiveRecord::Base.establish_connection :adapter => "sqlite3",
:database => "Tabelas.sqlite3"

class Procedimento < ActiveRecord::Base;
    has_many :recursos
    #has_and_belongs_to_many :dentistas
    #belongs_to :agendamento
end