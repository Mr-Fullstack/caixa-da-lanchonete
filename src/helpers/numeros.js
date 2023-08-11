function formatarMoeda(quantia,localidade,moeda){
    return new Intl.NumberFormat(localidade, { style: 'currency', currency: moeda }).format(quantia);
}

function formatarMoedaParaBRL(amount){
   return formatarMoeda(amount,'pt-BR','BRL')
}

export {
    formatarMoeda,
    formatarMoedaParaBRL
}