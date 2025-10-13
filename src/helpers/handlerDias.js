import { gerarIdKey } from "./handlerId";

function gerarDiaAtual() {
    return new Date()
}

export function gerarListaMes() {
    const dataAtual = gerarDiaAtual()
    const mes = dataAtual.getMonth();
    const ano = dataAtual.getFullYear();
    const ultimaData = new Date(ano, mes, 0);
    const ultimoDia = ultimaData.getDate();

    let dias = []

    for(let dia = 1; dia <= ultimoDia; dia++) {
        const data = new Date(ano, mes, dia);
        if(data.getDay() === 1 || data.getDay() === 3) {
            dias.push({id: gerarIdKey(), dataFormatada: formatarData(data), valor: 30, marcado: false});
        }
    }
    return dias;
}


function formatarData(data) {
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth()+1).padStart(2, '0');
    const diaSemana = data.getDay() === 1 ? "Segunda-Feira" : "Quarta-Feira";
    return `${dia}/${mes} - ${diaSemana}`;
}

export function gerarTitulo() {
    const dia = gerarDiaAtual();
    const mes = dia.getMonth();
    const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    return `${meses[mes]} ${dia.getFullYear()}`;
}
