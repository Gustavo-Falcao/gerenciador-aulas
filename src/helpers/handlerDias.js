import { gerarIdKey } from "./handlerId";

function gerarDataAtual() {
    return new Date();
}

export function gerarObjetoMesAtual() {
    const dataAtual = gerarDataAtual();
    const mes = dataAtual.getMonth();
    const ano = dataAtual.getFullYear();
    const ultimaData = new Date(ano, mes+1, 0);
    const ultimoDia = ultimaData.getDate();

    let dias = []

    console.log(`ULTIMO DIAAAA =>> ${ultimoDia}`)
console.log(`ULTIMO DAta =>> ${ultimaData}`)
    for(let dia = 1; dia <= ultimoDia; dia++) {
        const data = new Date(ano, mes, dia);
        if(data.getDay() === 1 || data.getDay() === 3) {
            dias.push({id: gerarIdKey(), dataFormatada: formatarData(data), valor: 30, marcado: false});
        }
    }
    return {arrayDias: dias, mes: mes, ano: ano};
}

export function gerarObjetoProximoMes() {
    const dataAtual = gerarDataAtual()
    const mes = dataAtual.getMonth() === 11 ? 0 : dataAtual.getMonth()+1
    console.log(`MES PEGO DO MES SEGUINTE => ${mes}`)
    const ano = mes === 0 ? dataAtual.getFullYear()+1 : dataAtual.getFullYear()
    console.log(`ANO GERADO => ${ano}`)
    const dataFinal = new Date(ano, mes+1, 0);
    console.log(`DATA GERADA COM O DIA 0 => ${dataFinal}`)
    const diaFinal = dataFinal.getDate()
    console.log(`DIA FINAL GERADO => ${diaFinal}`)

    let dias = []

    for(let dia = 1; dia <= diaFinal; dia ++) {
        const novaData = new Date(ano, mes, dia)
        if(novaData.getDay() === 1 || novaData.getDay() === 3) {
            dias = [...dias, {id: gerarIdKey(), dataFormatada: formatarData(novaData), valor: 30, marcado: false}]
        }
    }
    return {arrayDias: dias, mes: mes, ano: ano}
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

function gerarDiaSemana(dia) {
    let diaSemana = null

    switch(dia) {
        case 0: diaSemana = "Dom"; break;
        case 1: diaSemana = "Seg"; break;
        case 2: diaSemana = "Ter"; break;
        case 3: diaSemana = "Qua"; break;
        case 4: diaSemana = "Qui"; break;
        case 5: diaSemana = "Sex"; break;
        case 6: diaSemana = "Sáb"; break;
    }

    return diaSemana
}

export function gerarDataAtualTitulo() {
    const data = gerarDataAtual()
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = data.getMonth()
    const diaSemana = data.getDay()
    //const diasSemana = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
    const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    const diaSemanaString = gerarDiaSemana(diaSemana) 
    const mesString = meses[mes];
    return `${diaSemanaString}, ${dia} ${mesString} `
}