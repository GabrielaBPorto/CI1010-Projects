const url = 'resultados.json';
let jogoAtual = new Array();
var jogosMegaSena1 = new Array()
var jogosMegaSena2 = new Array()

window.onload = function(){ 
    var checked = new Array();
    inicializaCheckboxs()

    if(checked.length == 0) {
        $('#btnConferir').attr('disabled','disabled');
    }

    $('input').click( () => {
        var newValues = $('input:checked').map(function () {
            if(checked.indexOf(this.value) == -1){
                checked.push(this.value)
            }
            return this.value;
        })
        $('input:checkbox:not(:checked)').map(function () {
            if(checked.indexOf(this.value) > -1){
                checked.splice(checked.indexOf(this.value),1)
            }
            return this.value;
        })
        if(checked.length == 6){
            $("input:checkbox:not(:checked)").attr('disabled','disabled');
            $('#btnConferir').removeAttr('disabled');
        }
        else{
            $("input").removeAttr('disabled');
            $('#btnConferir').attr('disabled','disabled');
        }
        
        $("#choosen").empty()
        for(var i=0; i< checked.length;i++){
            $("#choosen").append("<div class='col-sx p-2'><p>"+checked[i]+"</p></div>")
        }
        jogoAtual = new Array()
        if(checked[0] != undefined) jogoAtual.push(parseInt(checked[0]))
        if(checked[1] != undefined) jogoAtual.push(parseInt(checked[1]))
        if(checked[2] != undefined) jogoAtual.push(parseInt(checked[2]))
        if(checked[3] != undefined) jogoAtual.push(parseInt(checked[3]))
        if(checked[4] != undefined) jogoAtual.push(parseInt(checked[4]))
        if(checked[5] != undefined) jogoAtual.push(parseInt(checked[5]))
    })

    $('#btnConferir').click( () => {
        if(jogoAtual.length > 0){
            jogosConferidos = new Array()
            var quantidadeAcerto = 0
            jogosMegaSena1.forEach((game) => {
                console.log('*************')
                quantidadeAcerto = 0;
                game.jogo.forEach((bola) => {
                    console.log(game.concurso)
                    console.log(bola)
                    if(jogoAtual.indexOf(bola) > -1){
                        quantidadeAcerto = quantidadeAcerto + 1
                    }
                })
                console.log(' a quantidade de acerto is ' + quantidadeAcerto)
                if(quantidadeAcerto > 3){
                    if(quantidadeAcerto == 6){
                        tipo = 'Megasena'
                        console.log('megasena')
                    }
                    else if(quantidadeAcerto == 5){
                        tipo = 'Quina'
                        console.log('quina')
                    }else if(quantidadeAcerto == 4){
                        tipo = 'Quadra'
                        console.log('quadra')
                    }
                    $("#resultados").append("<div style='border: solid; border-radius: 10px;'><span><em>"+tipo+"<strong>Concurso:</strong>"+game.concurso+"</span><span><strong>Data:</strong>"+game.data_sorteio+"</span></div>")
                }
                //console.log(game)
            })
            jogosMegaSena2.forEach((game) => {
                console.log('*************')
                quantidadeAcerto = 0;
                game.jogo.forEach((bola) => {
                    console.log(game.concurso)
                    console.log(bola)
                    if(jogoAtual.indexOf(bola) > -1){
                        quantidadeAcerto = quantidadeAcerto + 1
                    }
                })
                console.log(' a quantidade de acerto is ' + quantidadeAcerto)
                if(quantidadeAcerto > 3){
                    if(quantidadeAcerto == 6){
                        tipo = 'Megasena'
                        console.log('megasena')
                    }
                    else if(quantidadeAcerto == 5){
                        tipo = 'Quina'
                        console.log('quina')
                    }else if(quantidadeAcerto == 4){
                        tipo = 'Quadra'
                        console.log('quadra')
                    }
                    $("#resultados").append("<div style='border: solid; border-radius: 10px;'><span><em>"+tipo+"<strong>Concurso:</strong>"+game.concurso+"</span><span><strong>Data:</strong>"+game.data_sorteio+"</span></div>")
                }
                //console.log(game)
            })
    
                
        }
        console.log("Jogos conferidos")
    })

    $('#btnCarregar').click( async () => {

        await carregaResultadosLoteria()
        //Notificação na tela bootstrap.
        console.log("Jogos Carregados")
    })
}
function inicializaCheckboxs(){
    var linha;
    $('#canhoto').append("<div id='internForm'>")
    for(var i=0; i<60; i++){
        if( i % 10 == 0){
            linha = i
            novaLinha(i)
        }
        $('#linha'+linha).append("<div class='col-sm'> <input class='form-check-input' type='checkbox' value='"+(i+1)+"' id='flexCheckDefault'> <label class='form-check-label' for='flexCheckDefault'>"+(i+1)+"</label> </div>");
    }
    $('#canhoto').append("</div>")
}
function novaLinha (number) {
    if(number != 0){
        $('#internForm').append("</div>")
    }
    $('#internForm').append("<div class='row' id='linha"+number+"'>")
}

async function carregaResultadosLoteria(){
    
    try {
        await $.ajax({
            dataType: "json",
            url: 'resultadosMega1.json',
            success: (resultados) => {
                console.log('?????')
                resultados.forEach((resultado) => {
                    try{
                        var jogo = new Array()
                        jogo.push(resultado.bola1)
                        jogo.push(resultado.bola2)
                        jogo.push(resultado.bola3)
                        jogo.push(resultado.bola4)
                        jogo.push(resultado.bola5)
                        jogo.push(resultado.bola6)

                        jogosMegaSena1.push({"concurso":resultado.Concurso, "data_sorteio":resultado.Data, "jogo": jogo})
                        
                    }
                    catch (error) {
                        console.log('erro')
                    }
                })
            },
            error: () => {
                console.log("erro no acesso?")
            }
            });
        
        
    
    } catch (error) {
        console.log('erro try1')
        console.log(error)
    }

    try {
        await $.ajax({
            dataType: "json",
            url: 'resultadosMega2.json',
            success: (resultados) => {
                console.log('?????', resultados)
                resultados.forEach((resultado) => {
                    try{
                        var jogo = new Array()
                        jogo.push(resultado.bola1)
                        jogo.push(resultado.bola2)
                        jogo.push(resultado.bola3)
                        jogo.push(resultado.bola4)
                        jogo.push(resultado.bola5)
                        jogo.push(resultado.bola6)

                        jogosMegaSena2.push({"concurso":resultado.Concurso, "data_sorteio":resultado.Data, "jogo": jogo})
                        
                    }
                    catch (error) {
                        console.log('erro')
                    }
                })
            },
            error: () => {
                console.log("erro no acesso?")
            }
            });
        
        
    
    } catch (error) {
        console.log('erro try1')
        console.log(error)
    }
    
    
    // mega até 6 números, independe da ordem, acertou os 6 sena
    // quina (2º) 5 números, independe da ordem, 
    // quadra (3º) 4 números, independe da ordem.

    

}