import { formatarMoedaParaBRL } from "./helpers/numeros";
import { cardapio } from "./repository/cardapio-repositorio";

class CaixaDaLanchonete {

	checarItensExtra(itens) {
		const itemsExtras = []
		const todosOsProdutosPrincipais = [];
		itens.map( item => {
			if (item.extra) {
				itemsExtras.push(...item.extra)
			}
			if(item.codigo && !item.extra)
			{
				todosOsProdutosPrincipais.push(item.codigo);
			}
		});

		if (itemsExtras.length >= 1) {
			let resultado = itemsExtras.every(produto => todosOsProdutosPrincipais.includes(produto))
			return resultado;
		}

		return true;
	}

	checarMetodoDePagamento(metodoDePagamento) {
		switch (metodoDePagamento) {
			case 'dinheiro':
			case 'debito':
			case 'credito':
				return true;
			default:
				return false;
		}
	}
	
	checarSeProdutoExiste(itensNoPedido) {
		return itensNoPedido.every(item => item.codigo);
	}

	checarQuantidadesDeCadaProduto(itensNoPedido) {
		return itensNoPedido.every(item => item.quantidade >= 1)
	}

	cacularAsTaxasEDescontos(metodoDePagamento, subTotal) {
		switch (metodoDePagamento) {
			case 'dinheiro':
				return (subTotal - ( subTotal * 0.05 )).toFixed(2);
			case 'credito':
				return (subTotal + (subTotal * 0.03) ).toFixed(2);
			default:
				return subTotal;
		}
	}

	calcularValorDaCompra(metodoDePagamento, itens) {
		const itensNoPedido = [];
		let resultado = "";

		itens.map( item => {
		    let itemParaArray = item.split(',');
		    let produto = { ...cardapio.obterItemDoCardapio(itemParaArray[0]), quantidade:+itemParaArray[1] };
		    itensNoPedido.push({
					...produto,
					total:produto.preco * produto.quantidade
		    }) 
		});
		
		const itemExiste = this.checarSeProdutoExiste(itensNoPedido);
		const itemTemQuantidadeCorreta =  this.checarQuantidadesDeCadaProduto(itensNoPedido);
		const tudoCertoComItemsExtra = this.checarItensExtra(itensNoPedido);
		const tudoCertoComMetodoDePagamento = this.checarMetodoDePagamento(metodoDePagamento);

		if(itensNoPedido.length === 0)
		{
			resultado = 'Não há itens no carrinho de compra!'
		}
		else if(!itemExiste)
		{
			resultado = 'Item inválido!'
		}
		else if(!itemTemQuantidadeCorreta)
		{
			resultado = 'Quantidade inválida!'
		}
		else if(!tudoCertoComMetodoDePagamento)
		{
			resultado = 'Forma de pagamento inválida!'
		}
		else if(!tudoCertoComItemsExtra)
		{
			resultado = 'Item extra não pode ser pedido sem o principal'
		}
		else
		{
			const subtotal = itensNoPedido.map(item => item.total ).reduce((primeiroValor,proximoValor) => primeiroValor + proximoValor );
			resultado = formatarMoedaParaBRL(this.cacularAsTaxasEDescontos(metodoDePagamento,subtotal));
		}
		return resultado;
	}

}

export { CaixaDaLanchonete };
