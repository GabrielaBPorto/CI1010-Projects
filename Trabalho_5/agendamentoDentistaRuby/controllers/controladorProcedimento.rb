require_relative '../classes/procedimento.rb'

def imprimeInformacaoProcedimento(acao,procedimento)
    puts " Foi #{acao} procedimento com nome #{procedimento.nome} com o total de etapas #{procedimento.total_etapas}"
end
def criarProcedimento(dados)
    nome, total_etapas = dados.split(',')
    procedimento = Procedimento.find_by_nome(nome)
    if(procedimento)
        puts "procedimento já cadastrado"
        return
    end
    procedimento = Procedimento.new({:nome => nome,
        :total_etapas => total_etapas})
    procedimento.save
    imprimeInformacaoProcedimento('criado',procedimento)
end
def editarProcedimento(dados)
    nome, total_etapas = dados.split(',')
    if(!total_etapas)
        puts "Sem total etapas, por favor defina um total etapas"
    end
    procedimento = Procedimento.find_by_nome(nome)
    if(!procedimento)
        puts "O procedimento com esse nome não existe"
        return
    end
    procedimento.total_etapas = total_etapas
    procedimento.save
    imprimeInformacaoProcedimento('editado',procedimento)
end
def removerProcedimento(dados)
    nome = dados.split(',')
    procedimento = Procedimento.find_by_nome(nome)
    if(!procedimento)
        puts "O procedimento com esse nome não existe"
        return
    end
    procedimento.destroy
    imprimeInformacaoProcedimento('removido',procedimento)
end

def listarProcedimento
    procedimentos = Procedimento.all
  
    if procedimentos.empty?
      puts "Não há procedimentos cadastrados."
      return
    end
    puts "|----------------------------------------------------------------------------------------------|"
    puts "|                          Procedimentos                                                        |"

    procedimentos.each do |procedimento|
        puts "|                                                                                              |"
        puts "|  Procedimento: #{procedimento.nome} exige pelo menos #{procedimento.total_etapas} consultas                                               |"
        puts "|                                                                                              |"
      end

      puts "|----------------------------------------------------------------------------------------------|"
  end
  