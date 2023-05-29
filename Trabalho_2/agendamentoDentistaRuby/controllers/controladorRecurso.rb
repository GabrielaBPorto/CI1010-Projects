require_relative '../classes/procedimento.rb'
require_relative '../classes/recurso.rb'

def imprimeInformacaoRecurso(acao,recurso,procedimento='')
    print " Foi #{acao} recurso com nome #{recurso.nome} com custo #{recurso.custo}"
    if(procedimento != '')
        puts " e pertence ao procedimento #{procedimento.nome}"
    else
        puts ''
    end
end
def criarRecurso(dados)
    nome, custo, nomeProcedimento = dados.split(',')
    recurso = Recurso.find_by_nome(nome)
    if(recurso)
        puts "recurso já cadastrado"
        return
    end
    procedimento = Procedimento.find_by_nome(nomeProcedimento)
    if(!procedimento)
        puts "procedimento escolhido não existe, escolha outro"
        return
    end
    recurso = Recurso.new({:nome => nome,
        :custo => custo})
    recurso.procedimentos_id = procedimento.id
    recurso.save
    imprimeInformacaoRecurso('criado',recurso, procedimento)
end
def editarRecurso(dados)
    nome, custo, nomeProcedimento = dados.split(',')
    if(!custo)
        puts "Sem custo, por favor defina um custo"
    end
    recurso = Recurso.find_by_nome(nome)
    if(!recurso)
        puts "O recurso com esse nome não existe"
        return
    end
    procedimento = Procedimento.find_by_nome(nomeProcedimento)
    if(!procedimento)
        puts "procedimento escolhido não existe, escolha outro"
        return
    end
    recurso.custo = custo
    recurso.save
    imprimeInformacaoRecurso('editado',recurso,procedimento)
end
def removerRecurso(dados)
    nome = dados.split(',')
    recurso = Recurso.find_by_nome(nome)
    if(!recurso)
        puts "O recurso com esse nome não existe"
        return
    end
    recurso.destroy
    imprimeInformacaoRecurso('removido',recurso)
end
def listarRecurso
    recursos = Recurso.all
  
    if recursos.empty?
      puts "Não há recursos cadastrados."
      return
    end
  
    puts "|                          Recursos                                                           |"

    recursos.each do |recurso|
        puts "|                                                                                              |"
        puts "|  Recurso: #{recurso.nome} seu custo é: #{recurso.custo}                               |"
        puts "|  Pertence a #{recurso.procedimentos}                                                              |"
        puts "|                                                                                              |"
      end

      puts "|----------------------------------------------------------------------------------------------|"
  end
  