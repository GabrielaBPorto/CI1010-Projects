#!/usr/bin/env ruby
require_relative './controllers/controladorPaciente.rb'
require_relative './controllers/controladorRecurso.rb'
require_relative './controllers/controladorProcedimento.rb'
require_relative './controllers/controladorAgendamento.rb'
require_relative './controllers/controladorDentista.rb'

require 'date'

input = gets.chomp
while(!input.index('termino'))
    if(input == '')
        input = gets.chomp
        next
    end
    comando, tabela, dados = input.split(' ')
    if(comando.index('inserir'))
        if(tabela.index('paciente'))
            criarPaciente(dados)
        end
        if(tabela.index('recurso'))
            criarRecurso(dados)
        end
        if(tabela.index('procedimento'))
            criarProcedimento(dados)
        end
        if(tabela.index('agendamento'))
            criarAgendamento(dados)
        end
        if(tabela.index('dentistas'))
            criarDentista(dados)
        end
    end
    if(comando.index('editar'))
        if(tabela.index('paciente'))
            editarPaciente(dados)
        end
        if(tabela.index('recurso'))
            editarRecurso(dados)
        end
        if(tabela.index('procedimento'))
            editarProcedimento(dados)
        end
        if(tabela.index('agendamento'))
            editarAgendamento(dados)
        end
        if(tabela.index('dentistas'))
            editarDentista(dados)
        end
    end
    if(comando.index('remover'))
        if(tabela.index('paciente'))
            removerPaciente(dados)
        end
        if(tabela.index('recurso'))
            removerRecurso(dados)
        end
        if(tabela.index('procedimento'))
            removerProcedimento(dados)
        end
        if(tabela.index('agendamento'))
            removerAgendamento(dados)
        end
        if(tabela.index('dentistas'))
            removerDentista(dados)
        end
    end
    if(comando.index('lista'))
        if(tabela.index('paciente'))
            listarPacientes()
        end
        if(tabela.index('recurso'))
            listarRecurso()
        end
        if(tabela.index('procedimento'))
            listarProcedimento()
        end
        if(tabela.index('agendamento'))
            listarAgendamentos()
        end
        if(tabela.index('dentistas'))
            listarDentista()
        end
    end
    input = gets.chomp
end