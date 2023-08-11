import { descontoNoDinheiro, taxaNoCartao } from "../config";

function valorDoPagamentoEmDinheiro(quantia){
    return (quantia - ( quantia * descontoNoDinheiro )).toFixed(2);
}

function valorDoPagamentoComCartaoDeCredito(quantia){
    return (quantia + ( quantia * taxaNoCartao )).toFixed(2);
}

export {
    valorDoPagamentoEmDinheiro,
    valorDoPagamentoComCartaoDeCredito
}