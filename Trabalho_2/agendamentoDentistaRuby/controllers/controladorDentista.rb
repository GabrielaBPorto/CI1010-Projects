require_relative '../classes/dentista.rb'

def imprimeInformacaoDentista(acao,dentista)
    puts " Foi #{acao} dentista com nome #{dentista.nome} e cobra #{dentista.custo_por_procedimentos} por procedimento feito e o telefone para contato é #{dentista.telefone}"
end
def criarDentista(dados)
    nome, custo_por_procedimentos, telefone = dados.split(',')
    dentista = Dentista.find_by_nome(nome)
    if(dentista)
        puts "dentista já cadastrado"
        return
    end
    if(!telefone)
        telefone = '(41)99999-9999'
    end
    dentista = Dentista.new({:nome => nome,
        :custo_por_procedimentos => custo_por_procedimentos.to_f,
        :telefone => telefone})
    dentista.save
    imprimeInformacaoDentista('criado',dentista)
end
def editarDentista(dados)
    nome, custo_por_procedimentos, telefone = dados.split(',')
    dentista = Dentista.find_by_nome(nome)
    if(!dentista)
        puts "O dentista com esse nome não existe"
        return
    end
    dentista.custo_por_procedimentos = custo_por_procedimentos.to_f
    dentista.telefone = telefone
    dentista.save
    imprimeInformacaoDentista('editado',dentista)
end
def removerDentista(dados)
    nome = dados.split(',')
    dentista = Dentista.find_by_nome(nome)
    if(!dentista)
        puts "O dentista com esse nome não existe"
        return
    end
    dentista.destroy
    imprimeInformacaoDentista('removido',dentista)
end
def listarDentista
    dentistas = Dentista.all
  
    if dentistas.empty?
      puts "Não há dentistas cadastrados."
      return
    end
  
    dentistas.each do |dentista|
      puts "dentista: #{dentista.nome}"
      puts "---"
    end
  end
  