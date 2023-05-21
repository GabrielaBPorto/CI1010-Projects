require './classes/recurso.rb'
require './classes/procedimento.rb'

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