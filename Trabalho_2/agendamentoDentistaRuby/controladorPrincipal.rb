#!/usr/bin/env ruby
require './controllers/controladorPaciente.rb'
require './controllers/controladorRecurso.rb'
require './controllers/controladorProcedimento.rb'
require './controllers/controladorAgendamento.rb'
require './controllers/controladorDentista.rb'


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
        if(tabela.index('dentista'))
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
        if(tabela.index('dentista'))
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
        if(tabela.index('dentista'))
            removerDentista(dados)
        end
    end
    input = gets.chomp
end