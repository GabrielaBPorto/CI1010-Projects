require './classes/agendamento.rb'

require 'date'

def imprimeInformacaoAgendamento(acao,agendamento)
    puts " Foi #{acao} agendamento com data #{agendamento.data}"
end
def formataData(data,hora)
    dataQuebrada = data.split('/')
    horaQuebrada = hora.split(':')
    return DateTime.new(dataQuebrada[2].to_i,dataQuebrada[1].to_i,dataQuebrada[0].to_i, horaQuebrada[0].to_i, horaQuebrada[1].to_i, horaQuebrada[2].to_i)
end
def criarAgendamento(dados)
    data, hora = dados.split(',')
    dataAgendamento = formataData(data,hora)
    agendamento = Agendamento.find_by_data(dataAgendamento)
    if(agendamento)
        puts "Já existe um agendamento nesse horário"
        return
    end
    agendamento = Agendamento.new({:data => dataAgendamento})
    agendamento.save
    imprimeInformacaoAgendamento('criado',agendamento)
end
def editarAgendamento(dados)
    data, hora = dados.split(',')
    dataAgendamento = formataData(data,hora)
    agendamento = Agendamento.find_by_data(dataAgendamento)
    if(agendamento)
        puts "Já existe um agendamento nesse horário"
        return
    end
    #Bugado, por que tem que considerar um novo meio de encontrar esse agendamento, como um numero de protocolo
    agendamento.data = dataAgendamento
    agendamento.save
    imprimeInformacaoAgendamento('editado',agendamento)
end
def removerAgendamento(dados)
    data, hora = dados.split(',')
    dataAgendamento = formataData(data,hora)
    agendamento = Agendamento.find_by_data(dataAgendamento)
    if(!agendamento)
        puts "Não existe um agendamento nesse horário"
        return
    end
    agendamento.destroy
    imprimeInformacaoAgendamento('removido',agendamento)
end