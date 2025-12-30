import { gerarIdKey } from "./handlerId";

function gerarDataAtual() {
    return new Date();
}

// export function gerarObjetoMesAtual() {
//     const dataAtual = gerarDataAtual();
//     const mes = dataAtual.getMonth();
//     const ano = dataAtual.getFullYear();
//     const ultimaData = new Date(ano, mes+1, 0);
//     const ultimoDia = ultimaData.getDate();

//     let dias = []

//     console.log(`ULTIMO DIAAAA =>> ${ultimoDia}`)
//     console.log(`ULTIMO DAta =>> ${ultimaData}`)
//     for(let dia = 1; dia <= ultimoDia; dia++) {
//         const data = new Date(ano, mes, dia);
//         if(data.getDay() === 1 || data.getDay() === 3) {
//             dias.push({id: gerarIdKey(), dataFormatada: formatarData(data), valor: 30, marcado: false});
//         }
//     }

//     return {arrayDias: dias, mes: mes, ano: ano};
// }

//Array dias principal
function gerarArrayTodosOsDiasMesAtual() {
    const dataAtual = gerarDataAtual()

    const mesAtual = dataAtual.getMonth()
    const anoAtual = dataAtual.getFullYear()

    const ultimaDataMes = new Date(anoAtual, mesAtual+1, 0)
    const ultimoDia = ultimaDataMes.getDate()

    let arrayDias = []

    for(let dia = 1; dia <= ultimoDia; dia++) {
        const data = new Date(anoAtual, mesAtual, dia);
        if(data.getDay() === 1 || data.getDay() === 3) {
            arrayDias.push(
                {
                    id: gerarIdKey(),
                    dataFormatada: formatarData(data),
                    dataNumerosString: formatarDataNumeros(data), 
                    nomeDiaSemana: gerarDiaSemanaAlterarDia(data.getDay()),
                    invalido: true, 
                    marcado: false
                }
            )
        } else {
            arrayDias.push(
                {
                    id: gerarIdKey(),
                    dataFormatada: formatarData(data),
                    dataNumerosString: formatarDataNumeros(data), 
                    nomeDiaSemana: gerarDiaSemanaAlterarDia(data.getDay()),
                    invalido: false, 
                    marcado: false
                }
            )
        }
    }

    return arrayDias;
}



//Gerar array dias aulas a partir do array principal
export function gerarArrayTodosOsDiasMesAtualAndObjMesAtual() {
    const mes = gerarDataAtual().getMonth()
    const ano = gerarDataAtual().getFullYear()
    let arrayFullMes = gerarArrayTodosOsDiasMesAtual()
    console.log("Primeiro valor do array full dias abaixo")
    console.log(arrayFullMes[0].invalido)
    
    let novoArrDias = []
    
    for(let dia = 0; dia < arrayFullMes.length; dia++) {
        const elemento = arrayFullMes[dia]
        if(elemento.invalido === true) {
            novoArrDias.push({
                id: arrayFullMes[dia].id,
                dataFormatada: arrayFullMes[dia].dataFormatada,
                valor: 30,
                marcado: false
            });
        }
    }

    return {
        objMesAtual: {
            arrayDias: novoArrDias,
            mes: mes, 
            ano: ano
        },
        arrayFullMes: arrayFullMes
    }

}

function gerarArrayTodosOsDiasMesAtualParaAtualizacao(objMesAtual) {
    const mesAtual = objMesAtual.mes
    const anoAtual = objMesAtual.ano

    const ultimaDataMes = new Date(anoAtual, mesAtual+1, 0)
    const ultimoDia = ultimaDataMes.getDate()

    let arrayDias = []

    for(let dia = 1; dia <= ultimoDia; dia++) {
        const data = new Date(anoAtual, mesAtual, dia);
        if(data.getDay() === 1 || data.getDay() === 3) {
            arrayDias.push(
                {
                    id: gerarIdKey(),
                    dataFormatada: formatarData(data),
                    dataNumerosString: formatarDataNumeros(data), 
                    nomeDiaSemana: gerarDiaSemanaAlterarDia(data.getDay()),
                    invalido: true, 
                    marcado: false
                }
            )
        } else {
            arrayDias.push(
                {
                    id: gerarIdKey(),
                    dataFormatada: formatarData(data),
                    dataNumerosString: formatarDataNumeros(data), 
                    nomeDiaSemana: gerarDiaSemanaAlterarDia(data.getDay()),
                    invalido: false, 
                    marcado: false
                }
            )
        }
    }

    return arrayDias;
}

export function gerarArrayTodosOsDiasMesAtualAndObjMesAtualParaAtualizacao(objMesAtual) {
    const mes = objMesAtual.mes
    const ano = objMesAtual.ano
    let arrayFullMes = gerarArrayTodosOsDiasMesAtualParaAtualizacao(objMesAtual)
    console.log("Primeiro valor do array full dias abaixo")
    console.log(arrayFullMes[0].invalido)
    
    let novoArrDias = []
    
    for(let dia = 0; dia < arrayFullMes.length; dia++) {
        const elemento = arrayFullMes[dia]
        if(elemento.invalido === true) {
            const objEncontrado = objMesAtual.arrayDias.find((diaFind) => diaFind.dataFormatada === arrayFullMes[dia].dataFormatada);
        
            novoArrDias.push({
                id: arrayFullMes[dia].id,
                dataFormatada: arrayFullMes[dia].dataFormatada,
                valor: 30,
                marcado: objEncontrado.marcado
            });
        }
    }

    return {
        objMesAtual: {
            arrayDias: novoArrDias,
            mes: mes, 
            ano: ano
        },
        arrayFullMes: arrayFullMes
    }

}

export function gerarObjetoProximoMes(mesAtual, anoAtual) {
    const mes = mesAtual === 11 ? 0 : mesAtual+1;
    const ano = mes === 0 ? anoAtual+1 : anoAtual;
    console.log(`ANO GERADO => ${ano}`)
    const dataFinal = new Date(ano, mes+1, 0);
    console.log(`DATA GERADA COM O DIA 0 => ${dataFinal}`)
    const diaFinal = dataFinal.getDate()
    console.log(`DIA FINAL GERADO => ${diaFinal}`)

    let dias = []

    for(let dia = 1; dia <= diaFinal; dia ++) {
        const novaData = new Date(ano, mes, dia)
        if(novaData.getDay() === 1 || novaData.getDay() === 3) {
            dias = [...dias, 
                {
                    id: gerarIdKey(), 
                    dataFormatada: formatarData(novaData), 
                    valor: 30, 
                    marcado: false
                }]
        }
    }
    return {arrayDias: dias, mes: mes, ano: ano}
}

//Array full mes proximo mes
function gerarArrayTodosOsDiasProximoMes(objMesAtual) {
    const mesAtual = objMesAtual.mes === 11 ? 0 : objMesAtual.mes+1;
    const anoAtual = mesAtual === 0 ? objMesAtual.ano+1 : objMesAtual.ano;

    const ultimaDataMes = new Date(anoAtual, mesAtual+1, 0)
    const ultimoDia = ultimaDataMes.getDate()

    let arrayDias = []

    for(let dia = 1; dia <= ultimoDia; dia++) {
        const data = new Date(anoAtual, mesAtual, dia);
        if(data.getDay() === 1 || data.getDay() === 3) {
            arrayDias.push(
                {
                    id: gerarIdKey(),
                    dataFormatada: formatarData(data),
                    dataNumerosString: formatarDataNumeros(data), 
                    nomeDiaSemana: gerarDiaSemanaAlterarDia(data.getDay()),
                    invalido: true, 
                    marcado: false
                }
            )
        } else {
            arrayDias.push(
                {
                    id: gerarIdKey(),
                    dataFormatada: formatarData(data),
                    dataNumerosString: formatarDataNumeros(data), 
                    nomeDiaSemana: gerarDiaSemanaAlterarDia(data.getDay()),
                    invalido: false, 
                    marcado: false
                }
            )
        }
    }

    return arrayDias;
}

//Objeto mesAtual proximo mes e array full dias proximo mes
export function gerarArrayTodosOsDiasProximoMesEObjetoMesAtualProximoMes(objMesAtual) {
    const mes = objMesAtual.mes === 11 ? 0 : objMesAtual.mes+1;
    const ano = mes === 0 ? objMesAtual.ano+1 : objMesAtual.ano;
    let arrayFullMes = gerarArrayTodosOsDiasProximoMes(objMesAtual)
    
    let novoArrDias = []
    
    for(let dia = 0; dia < arrayFullMes.length; dia++) {
        const elemento = arrayFullMes[dia]
        if(elemento.invalido === true) {
            novoArrDias.push({
                id: arrayFullMes[dia].id,
                dataFormatada: arrayFullMes[dia].dataFormatada,
                valor: 30,
                marcado: false
            });
        }
    }

    return {
        objMesAtual: {
            arrayDias: novoArrDias,
            mes: mes, 
            ano: ano
        },
        arrayFullMes: arrayFullMes
    }

}

function formatarData(data) {
    const diasSemana = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"];
    const diaEmes = formatarDataNumeros(data);
    const diaSemana = diasSemana[data.getDay()];
    return `${diaEmes} - ${diaSemana}`;
}

function formatarDataNumeros(data) {
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth()+1).padStart(2, '0');

    return `${dia}/${mes}`;
}

export function gerarTitulo(mes, ano) {
    const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    return `${meses[mes]} ${ano}`;
}

export function isObjetoAtual(objMesAtual) {
    const dataAtual = gerarDataAtual();
    return dataAtual.getMonth() === objMesAtual.mes
}

function gerarDiaSemanaBrev(dia) {
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

function gerarDiaSemanaAlterarDia(dia) {
    const diasSemana = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

    return diasSemana[dia];
}

export function gerarDataAtualTitulo() {
    const data = gerarDataAtual()
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = data.getMonth()
    const diaSemana = data.getDay()
    //const diasSemana = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
    const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    const diaSemanaString = gerarDiaSemanaBrev(diaSemana) 
    const mesString = meses[mes];
    return `${diaSemanaString}, ${dia} ${mesString} `
}