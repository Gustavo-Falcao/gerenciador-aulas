import { gerarIdKey } from "./handlerId";

function gerarDataAtual() {
    return new Date();
}

export function gerarObjetoMesAtual() {
    const dataAtual = gerarDataAtual();
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
    return {arrayDias: dias, mes: mes, ano: ano};
}


function formatarData(data) {
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth()+1).padStart(2, '0');
    const diaSemana = data.getDay() === 1 ? "Segunda-Feira" : "Quarta-Feira";
    return `${dia}/${mes} - ${diaSemana}`;
}

export function gerarTitulo(mes, ano) {
    const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    return `${meses[mes]} ${ano}`;
}

export function isObjetoAtual(objMesAtual) {
    const dataAtual = gerarDataAtual();
    return dataAtual.getMonth() === objMesAtual.mes
}

export function gerarDataAtualTitulo() {
    const data = gerarDataAtual()
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = data.getMonth()
    const diaSemana = data.getDay()
    const diasSemana = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
    const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    const diaSemanaString = diasSemana[diaSemana];
    const mesString = meses[mes];
    return `${diaSemanaString}, ${dia} ${mesString} `
}