import dijkstra from "./functions/dijkstra.js";
import camino from "./functions/camino.js";

const letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

const algoritmo = (matriz, inicio, fin) => {
    const nodos = matriz.map((_, i) => ({ permanente: false, indice: i }));

    dijkstra(matriz, nodos, inicio);
    const recorrido = camino(nodos, fin);
    let recorrer = recorrido.map(index => letras[index]).reverse().join('-'); 
    recorrer += '- Distancia mínima: '+nodos[fin].acumulado;
    document.getElementById('matriz').textContent = recorrer;
}

document.getElementById('generar').addEventListener('click', () => {
    let nodos = grafo.nodes().map(n => n.id());
    let matriz = Array.from({ length: nodos.length }, () => Array(nodos.length).fill(0));

    grafo.edges().forEach(edge => {
        let i = nodos.indexOf(edge.source().id());
        let j = nodos.indexOf(edge.target().id());
        matriz[i][j] = edge.data('weight');
        if (!edge.data('directed')) {
            matriz[j][i] = edge.data('weight');
        }
    });

    const inicio = prompt('Ingrese el inicio');
    const final = prompt('Ingrese el final');
    console.log(matriz);
    const indiceInicio = letras.indexOf(inicio);
    const indiceFinal = letras.indexOf(final);

    if (indiceInicio !== -1 && indiceFinal !== -1) {
        algoritmo(matriz, indiceInicio, indiceFinal);
    } else {
        alert('Vértices no disponibles');
    }
});
