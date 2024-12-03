import { getCSS, tickConfig } from "./common.js";

async function visualizarDadosEscola() {
    const url = './dados/dados-escola.json';
    const res = await fetch(url);
    const dados = await res.json();

    
    const paragrafo = document.createElement('p');
    paragrafo.classList.add('graficos-container__texto');
    paragrafo.innerHTML = `
        Nossa escola tem um total de <span>${dados.total_pessoas} pessoas</span>, 
        incluindo <span>${dados.total_alunos} alunos</span> e 
        <span>${dados.total_professores} professores</span>. 
        Em média, as pessoas passam <span>${Math.floor(dados.tempo_medio)} horas e ${Math.round((dados.tempo_medio % 1) * 60)} minutos</span> conectadas nas redes sociais.
        Isso representa <span>${dados.uso_porcentagem}%</span> de uso.
    `;

    const container = document.getElementById('graficos-container');
    container.innerHTML = '';
    container.appendChild(paragrafo);

    
    const redes = Object.keys(dados.redes_sociais);
    const usuarios = Object.values(dados.redes_sociais);

    const data = [
        {
            x: redes,
            y: usuarios,
            type: 'bar',
            marker: {
                color: getCSS('--secondary-color')
            }
        }
    ];

    const layout = {
        plot_bgcolor: getCSS('--bg-color'),
        paper_bgcolor: getCSS('--bg-color'),
        title: {
            text: 'Uso das Redes Sociais na Escola',
            x: 0,
            font: {
                color: getCSS('--primary-color'),
                size: 30,
                font: getCSS('--font')
            }
        },
        xaxis: {
            tickfont: tickConfig,
            title: {
                text: 'Nome das redes',
                font: {
                    color: getCSS('--secondary-color')
                }
            }
        },
        yaxis: {
            tickfont: tickConfig,
            title: {
                text: 'Número de usuários',
                font: {
                    color: getCSS('--secondary-color')
                }
            }
        }
    };

    const grafico = document.createElement('div');
    grafico.className = 'grafico';
    container.appendChild(grafico);
    Plotly.newPlot(grafico, data, layout);
}

document.getElementById('link-escola').addEventListener('click', (e) => {
    e.preventDefault(); 
    visualizarDadosEscola();
});
