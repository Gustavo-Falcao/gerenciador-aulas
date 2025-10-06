function gerarListaMes() {
    const dataAtual = new Date();
    const mes = dataAtual.getMonth();
    const ano = dataAtual.getFullYear();
    const ultimaData = new Date(ano, mes+1, 0);
    const ultimoDia = ultimaData.getDate();

    let dias = []

    for(let dia = 1; dia <= ultimoDia; dia++) {
        const data = new Date(ano, mes+1, dia);
        if(data.getDay() === 1 || data.getDay() === 3) {
            dias.push(data);
        }
    }
    return dias;
}

export default gerarListaMes;