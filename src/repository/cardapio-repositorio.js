import { todosProdutos } from "../database/produtos";

class RepositorioCardapio {

	#cardapio = [];

	constructor() 
	{
		this.#cardapio = todosProdutos;
	}

	obterItemDoCardapio(codigoDoProduto) {
		const itemEncontrado = this.#cardapio.filter(item => item.codigo === codigoDoProduto)[0];
		if (itemEncontrado) {
			return itemEncontrado;
		}
	}
}

const cardapio = new RepositorioCardapio();

export { cardapio }