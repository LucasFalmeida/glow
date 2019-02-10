
class Despesa {
	constructor(ano, mes, dia, tipo, descricao, valor) {
		this.ano = ano
		this.mes = mes
		this.dia = dia
		this.tipo = tipo
		this.descricao = descricao
		this.valor = valor
	}
	validarDados(){
		for (let i in this){
			//mostra os dados recebidos do que o i achou
			//console.log(i, this[i])
			if(this[i] == undefined || this[i]=='' || this[i] == null){
				return false

			}
		}


		return true
	}

}
//construindo o objeto banco de dados que possui como caracteristica ID e descrição
//a descrição a gente cria com base numa funcao desse objeto chamado gravar, que recebe o outro objeto
// chamado despesa



class Db {
		constructor(){

			//caracteristicas desse objeto
			let id = localStorage.getItem('id')
			if(id===null){
				localStorage.setItem('id', 0)
			}
		}

		//funcoes desse objeto
		getProximoId(){
			let proximoId = localStorage.getItem('id')
			//retorna um int ao inves de string
			return parseInt(proximoId) +1
			
		}

		//funcao de gravar os dados dentro desse bd
		gravar(d){
		let id = this.getProximoId()
		localStorage.setItem(id, JSON.stringify(d))

		localStorage.setItem('id', id)
		}


		pesquisar(despesa = Array()){
			//recuperando o id de tbody
			let listaDespesas = document.getElementById('listaDespesas')
			let despesas = Array()
			let despesaFiltrada = Array()
			//function limparCampos(){
			let ano = despesa.ano
			let mes = despesa.mes
			let dia = despesa.dia
			let tipo = despesa.tipo
			let desscricao = despesa.desscricao
			let valor = despesa.valor
			
			

			//historico
			despesas = db.recuperarTodosRegistros()
			/*
			let ano_despesas = despesas.forEach(function(c){
			return c.ano
				
			})
			let mes_despesas = despesas.forEach(function(c){
			return c.mes
				
			})
			*/
			if(despesa.ano != '' || despesa.descricao != '' || despesa.dia != ''|| despesa.mes != ''|| despesa.tipo != ''|| despesa.valor != ''){
				//ano
				if(despesa.ano != '' ){
				despesaFiltrada = despesas.filter(f => f.ano == despesa.ano)
				console.log('filtro ano')
	
				//limparCampos()
				}
				//descricao
				if(despesa.descricao != ''){
				despesaFiltrada = despesas.filter(f => f.descricao == despesa.descricao)
			
				console.log('filtro descricao')
				}
				//dia
				if(despesa.dia != ''){
				despesaFiltrada = despesas.filter(f => f.dia == despesa.dia)
	
				console.log('filtro dia')
				}
				//mes
				if(despesa.mes != '' ){
				despesaFiltrada = despesas.filter(f => f.mes == despesa.mes)
				
				console.log('filtro mes')
		
				}
				//tipo
				if(despesa.tipo != ''){
				despesaFiltrada = despesas.filter(f => f.tipo == despesa.tipo)
				
				console.log('filtro tipo')
			
				}
				//valor
				if(despesa.valor != ''){
				despesaFiltrada = despesas.filter(f => f.valor == despesa.valor)
				
				console.log('filtro valor')
				}	
			
				//atribuindo valor vazio
				listaDespesas.innerHTML = ''
				//completando com o valor pesquisado
				criaTabela(despesaFiltrada)


				}
				else{
					listaDespesas.innerHTML = ''
					carregaListaDespesas()
				}

			}
		
			remover(id){
				localStorage.removeItem(id)
			}
	
			recuperarTodosRegistros(){

					let despesas = Array()
					let id = localStorage.getItem('id')

					//recupera todas as despesas armazenadas em local storage
					for (let i = 1 ; i <= id; i++){	

						//recuperar a despesa
						//JSON transforma em objeto literal (que foi convertido em JSON anteriormente)
						let despesa = JSON.parse(localStorage.getItem(i))

						//verifica se a posição foi excluida, e se for, ao inves de retorar uma posição
						//null no array, ele "continua" e ignora a posição
						if (despesa === null){
							continue 
						}
						despesa.id = i
						despesas.push(despesa)

					}
					return despesas 
					
			}
}
//cria a classe DB
let db = new Db()
	
function cadastrarDespesa(){
	let ano = document.getElementById('ano')
	let mes = document.getElementById('mes')
	let dia = document.getElementById('dia')
	let tipo = document.getElementById('tipo')
	let descricao = document.getElementById('descricao')
	let valor = document.getElementById('valor')
	//instancio o objeto e passo os parametros esperados pelo constutor
	// também é o objeto criado e chamado no storage (linha 45)
	let despesa = new Despesa(  
		//variavel do escopo da funcao que capta o elemento do DOM
		ano.value,
		mes.value,
		dia.value,
		tipo.value,
		descricao.value,
		valor.value,
		)

	function limparCampos(){
		ano.value = "",
		mes.value = "",
		dia.value = "",
		tipo.value = "",
		descricao.value = "",
		valor.value = ""
	}



	if(despesa.validarDados()) {
		//bd.gravar(despesa)

		document.getElementById('modal_titulo').innerHTML = 'Registro inserido com sucesso'
		document.getElementById('modal_titulo_div').className = 'modal-header text-success'
		document.getElementById('modal_conteudo').innerHTML = 'Despesa foi cadastrada com sucesso!'
		document.getElementById('modal_btn').innerHTML = 'Voltar'
		document.getElementById('modal_btn').className = 'btn btn-success'
		db.gravar(despesa)
		//dialog de sucesso
		$('#modalRegistraDespesa').modal('show') 

		limparCampos()
		} else {
		
		document.getElementById('modal_titulo').innerHTML = 'Erro na inclusão do registro'
		document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
		document.getElementById('modal_conteudo').innerHTML = 'Erro na gravação, verifique se todos os campos foram preenchidos corretamente!'
		document.getElementById('modal_btn').innerHTML = 'Voltar e corrigir'
		document.getElementById('modal_btn').className = 'btn btn-danger'

		//dialog de erro
		$('#modalRegistraDespesa').modal('show') 
	}
}


function carregaListaDespesas(){
	criaTabela(db.recuperarTodosRegistros())
}



function pesquisarDespesa(){
	//recupera os valores no onclick
	//passando os parametros necessarios para criar o objeto Despesa
	let ano = document.getElementById('ano').value 
	let mes = document.getElementById('mes').value 
	let dia = document.getElementById('dia').value 
	let tipo = document.getElementById('tipo').value 
	let descricao = document.getElementById('descricao').value 
	let valor = document.getElementById('valor').value 
	//cria o objeto despesa da pesquisa
	let despesa = new Despesa(ano,mes,dia,tipo,descricao,valor)
	db.pesquisar(despesa)


}


function criaTabela(despesas){
//let listaDespesas = document.getElementById('listaDespesas')
		despesas.forEach(function(d){
		//criando a TR
		let linha = listaDespesas.insertRow()
		//cria as colunas das linhas 
		linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
		switch (d.tipo) {
			case '1': d.tipo =  "Alimentação"
			break
			case '2': d.tipo =  "Educação"
			break 
			case '3': d.tipo =  "Lazer"
			break 
			case '4': d.tipo =  "Saúde"
			break 
			case '5': d.tipo =  "Transporte"
			break 

		}
		linha.insertCell(1).innerHTML = d.tipo
		linha.insertCell(2).innerHTML = d.descricao
		linha.insertCell(3).innerHTML = d.valor
		let btn = document.createElement("button")
		btn.className = 'btn btn-danger'
		btn.innerHTML = '<i class="fas fa-times"></i>'
		btn.id = `id_despesa_${d.id}`
		linha.insertCell(4).append(btn)
				//insere popup de item excluido com sucesso
				btn.onclick = function(){
						document.getElementById('modal_titulo').innerHTML = 'Registro removido com sucesso'
						document.getElementById('modal_titulo_div').className = 'modal-header text-success'
						document.getElementById('modal_conteudo').innerHTML = 'Despesa foi removido com sucesso!'
						document.getElementById('modal_btn').innerHTML = 'Ok!'
						document.getElementById('modal_btn').className = 'btn btn-success'
						//arruma id do botão
						let id = this.id.replace('id_despesa_','')
						//dialog de sucesso
						$('#modalRegistraDespesa').modal('show') 
						let btnModal = document.getElementById('modal_btn')

						btnModal.onclick = function(){

							db.remover(id)
							window.location.reload()
						}
				}

		})

}
