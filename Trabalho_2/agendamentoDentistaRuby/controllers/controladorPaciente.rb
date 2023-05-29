require_relative '../classes/paciente.rb'

def imprimeInformacaoPaciente(acao,paciente)
    puts " Foi #{acao} paciente com nome #{paciente.nome} #{paciente.sobrenome} com telefone #{paciente.telefone}"
end
def criarPaciente(dados)
    nome, sobrenome, telefone = dados.split(',')
    paciente = Paciente.find_by_nome(nome)
    if(paciente)
        puts "Paciente já cadastrado"
        return
    end
    if(!telefone)
        telefone = '(41)99999-9999'
    end
    paciente = Paciente.new({:nome => nome,
        :sobrenome => sobrenome,
        :telefone => telefone})
    paciente.save
    imprimeInformacaoPaciente('criado',paciente)
end
def editarPaciente(dados)
    nome, sobrenome, telefone = dados.split(',')
    paciente = Paciente.find_by_nome(nome)
    if(!paciente)
        puts "O paciente com esse nome não existe"
        return
    end
    paciente.sobrenome = sobrenome
    paciente.telefone = telefone
    paciente.save
    imprimeInformacaoPaciente('editado',paciente)
end
def removerPaciente(dados)
    nome = dados.split(',')
    paciente = Paciente.find_by_nome(nome)
    if(!paciente)
        puts "O paciente com esse nome não existe"
        return
    end
    paciente.destroy
    imprimeInformacaoPaciente('removido',paciente)
end
def listarPacientes
    pacientes = Paciente.all
  
    if pacientes.empty?
      puts "Não há pacientes cadastrados."
      return
    end

    puts "|                          Pacientes                                                        |"

    pacientes.each do |paciente|
      puts "|**********************************************************************************************|"
      puts "|  Paciente: #{paciente.nome} #{paciente.sobrenome}                               |"
      puts "|  é possível contata-lo no número #{paciente.telefone}                                                              |"
      puts "|**********************************************************************************************|"
    end
  
    puts "|                                                                                              |"
  end
  