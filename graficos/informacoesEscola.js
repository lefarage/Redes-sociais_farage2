import { getCSS, tickConfig } from "./common.js";

async function visualizarDadosEscola() {
    const url = 'https://raw.githubusercontent.com/lefarage/Redes-sociais_farage2/refs/heads/main/graficos/informacoesalunos.json'
    const res = await fetch(url);
    const dados = await res.json();

    
    const paragrafo = document.createElement('p');
    paragrafo.classList.add('graficos-container__texto');
    paragrafo.innerHTML = `
        Na escola Vinícius de Moraes a marior parte do corpo docente é formada por adolescentes ou pré-adolescentes. Uma pesquisa foi realizada para saber como esses adolescentes fazem o uso de redes sociais no seu dia a dia, contando com um total de <span>${totalalunos}</span> presentes na escola. A maior parte desse número, cerca de <span>${conectados_instagram}</span> faz uso do Instagram, ficando na rede por cerca de <span>${tempo_medio_conectados} horas. Isso representa quase 30% do dia desses adolescentes.`


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
