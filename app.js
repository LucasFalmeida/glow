//criei o objeto com base em classe
/*

class Despesa {
	//construtor em base de parametros que vai ser recebido
	constructor(ano,mes,dia,tipo,descricao,valor){
		//this referencia a variavel do escopo do objeto, e o do lado direito, a variavel
		// do contexto do DOM resgatado nos parametros do construtor, que é alimentado pela funcao CadastrarDespesa	
		this.ano = ano
		this.mes = mes
		this.dia = dia 
		this.tipo = tipo
		this.descricao = descricao
		this.valor = valor
	}
}

//função que capta os valores do DOM

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
	//debug para ver o objeto chamado "despesa"
	console.log(despesa)
	// chama a função gravar com o parametro necessario (despesa)
	gravar(despesa)
}

// grava no local storage do navegador
function gravar(d){
	//'despesa' nesse caso é o objeto criado lá em cima
	localStorage.setItem('despesa',JSON.stringify(d))

}

*/

/*
let Despesa = function(ano,mes,dia,tipo,descricao,valor){
	return{
		ano,
		mes,
		dia,
		tipo,
		descricao,
		valor,
	
	}

	validarDados = function(){
		for (i in this){
			console.log(i)

		}
	}
}

*/

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
		pesquisar(despesa){
			console.log(despesa)
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
	let despesas = Array()
	despesas = db.recuperarTodosRegistros()

	let listaDespesas = document.getElementById('listaDespesas')

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
		linha.insertCell(1).innerHTML = `${d.tipo}`
		linha.insertCell(2).innerHTML = `${d.descricao}`
		linha.insertCell(3).innerHTML = `${d.valor}`
	})
}

function pesquisarDespesa(){
	//recupera os valores no onclick
	let ano = document.getElementById('ano').value 
	let mes = document.getElementById('mes').value 
	let dia = document.getElementById('dia').value 
	let tipo = document.getElementById('tipo').value 
	let descricao = document.getElementById('descricao').value 
	let valor = document.getElementById('valor').value 
	//cria o objeto despesa da pesquisa
	let despesa = new Despesa(ano,mes,dia,tipo,descricao,valor)//passando os parametros necessarios para criar o objeto Despesa

	//chama o metodo pesquisar do objeto db (database) e passa o parametro (objeto despesa) criado nessa função 
	db.pesquisar(despesa)
}