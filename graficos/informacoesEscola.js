import { getCSS, tickConfig } from "./common.js"

async function visualizarDadosEscola() {
    try {
        const url = 'https://raw.githubusercontent.com/lefarage/Redes-sociais_farage2/refs/heads/main/graficos/informacoesalunos.json';
        const res = await fetch(url)
        const dados = await res.json()

        
        if (!dados.redes_sociais) {
            console.error("Erro: 'redes_sociais' não está definido no JSON.");
            return;
        }

        
        const paragrafo = document.createElement('p')
        paragrafo.classList.add('graficos-container__texto')
        paragrafo.innerHTML = `
            Na escola Vinícius de Moraes, a maior parte do corpo docente é formada por adolescentes ou pré-adolescentes. 
            Uma pesquisa foi realizada para saber como esses adolescentes fazem o uso de redes sociais no dia a dia. 
            Contamos com um total de <span>${dados.totalalunos}</span> estudantes. 
            A maior parte desse número, cerca de <span>${dados.conectados_instagram}</span>, faz uso do Instagram, 
            permanecendo na rede por aproximadamente <span>${dados.tempo_medio_conectados}</span> horas por dia.`;

        
        const container = document.getElementById('graficos-container')
        container.innerHTML = ''
        container.appendChild(paragrafo)

        
        if (dados.redes_sociais) {
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
            ]

        const layout = {
            plot_bgcolor: getCSS('--bg-color'),
            paper_bgcolor: getCSS('--bg-color'),
            title: {
                text: 'Uso das Redes Sociais na Escola',
                x: 0,
                font: {
                    color: getCSS('--primary-color'),
                    size: 30,
                    family: getCSS('--font')
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
        }

        
        const grafico = document.createElement('div')
        grafico.className = 'grafico'
        container.appendChild(grafico)
        Plotly.newPlot(grafico, data, layout)
    } catch (error) {
        console.error("Erro ao carregar dados da escola:", error)
    }
}


document.getElementById('link-escola').addEventListener('click', (e) => {
    e.preventDefault()
    visualizarDadosEscola()
})
