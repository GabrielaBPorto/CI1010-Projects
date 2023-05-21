require './classes/paciente.rb'

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