require_relative '../classes/agendamento.rb'

require 'date'

def imprimeInformacaoAgendamento(acao, agendamento)
  puts "Foi #{acao} agendamento com data #{agendamento.data} para o paciente #{agendamento.paciente.nome} para o procedimento #{agendamento.procedimento.nome} com o dentista #{agendamento.dentista.nome}"
end

def formataData(data, hora)
  dataQuebrada = data.split('/')
  horaQuebrada = hora.split(':')
  DateTime.new(dataQuebrada[2].to_i, dataQuebrada[1].to_i, dataQuebrada[0].to_i, horaQuebrada[0].to_i, horaQuebrada[1].to_i, horaQuebrada[2].to_i)
end

def criarAgendamento(dados)
  data, hora, nome_paciente, nome_dentista, nome_procedimento = dados.split(',')
  dataAgendamento = formataData(data, hora)

  if nome_paciente.nil? || nome_paciente.strip.empty?
    puts "O nome do paciente não pode ser vazio"
    return
  end
  if nome_dentista.nil? || nome_dentista.strip.empty?
    puts "O nome do dentista não pode ser vazio"
    return
  end
  if nome_procedimento.nil? || nome_procedimento.strip.empty?
    puts "O nome do procedimento não pode ser vazio"
    return
  end
  if dataAgendamento.nil?
    puts "A data não pode ser vazia"
    return
  end

  paciente = Paciente.find_by(nome: nome_paciente)
  dentista = Dentista.find_by(nome: nome_dentista)
  procedimento = Procedimento.find_by(nome: nome_procedimento)

  if paciente.nil?
    puts "O paciente com nome #{nome_paciente} não foi encontrado"
    return
  end
  if dentista.nil?
    puts "O dentista com nome #{nome_dentista} não foi encontrado"
    return
  end
  if procedimento.nil?
    puts "O procedimento com nome #{nome_procedimento} não foi encontrado"
    return
  end

  agendamento = Agendamento.find_by(data: dataAgendamento)

  if agendamento
    puts "Já existe um agendamento nesse horário"
    return
  end

  agendamento = Agendamento.new(data: dataAgendamento, paciente: paciente, dentista: dentista, procedimento: procedimento)
  agendamento.save

  imprimeInformacaoAgendamento('criado', agendamento)
end

def editarAgendamento(dados)
  data, hora, nome_paciente, nome_dentista, nome_procedimento = dados.split(',')
  dataAgendamento = formataData(data, hora)

  agendamento = Agendamento.find_by(data: dataAgendamento)

  if agendamento.nil?
    puts "Não existe um agendamento nesse horário"
    return
  end

  paciente = Paciente.find_by(nome: nome_paciente)
  dentista = Dentista.find_by(nome: nome_dentista)
  procedimento = Procedimento.find_by(nome: nome_procedimento)

  if paciente.nil?
    puts "O paciente com nome #{nome_paciente} não foi encontrado"
    return
  end

  if dentista.nil?
    puts "O dentista com nome #{nome_dentista} não foi encontrado"
    return
  end

  if procedimento.nil?
    puts "O procedimento com nome #{nome_procedimento} não foi encontrado"
    return
  end

  agendamento.data = dataAgendamento
  agendamento.paciente = paciente
  agendamento.dentista = dentista
  agendamento.procedimento = procedimento
  agendamento.save

  imprimeInformacaoAgendamento('editado', agendamento)
end

def removerAgendamento(dados)
  data, hora = dados.split(',')
  dataAgendamento = formataData(data, hora)

  agendamento = Agendamento.find_by_data(dataAgendamento)

  if !agendamento
    puts "Não existe um agendamento nesse horário"
    return
  end

  agendamento.destroy

  imprimeInformacaoAgendamento('removido', agendamento)
end
def listarAgendamentos
  agendamentos = Agendamento.all

  if agendamentos.empty?
    puts "Não há agendamentos cadastrados."
    return
  end

  puts "|--------------------------Agendamentos------------------------------------------|"

  agendamentos.each do |agendamento|
    puts "|**********************************************************************************************|"
    puts "|--agendamento: #{agendamento.data} para o paciente #{agendamento.paciente.nome}-------------------------------|"
    puts "|--procedimento #{agendamento.procedimento.nome} com dentista #{agendamento.dentista.nome}}---------------------------------------------|"
    puts "|**********************************************************************************************|"
  end

  puts "|--------------------------------------------------------------------------------|"
end
