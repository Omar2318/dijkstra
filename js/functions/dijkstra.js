export default (matriz, nodos, inicio) => {
    const size = matriz.length;
    nodos[inicio] = {
        acumulado: 0,
        predecesor: '-',
        permanente: false, 
    };

    while (true) {
        let menor = Infinity;
        let u = -1;
        for (let j = 0; j < size; j++) {
            if (!nodos[j].permanente && nodos[j].acumulado !== undefined && nodos[j].acumulado < menor) {
                menor = nodos[j].acumulado;
                u = j;
            }
        }

        if (u === -1) break;

        nodos[u].permanente = true;

        for (let v = 0; v < size; v++) {
            if (matriz[u][v] !== 0 && !nodos[v].permanente) {
                const total = nodos[u].acumulado + matriz[u][v];
                if (nodos[v].acumulado === undefined || total < nodos[v].acumulado) {
                    nodos[v].acumulado = total;
                    nodos[v].predecesor = u;
                }
            }
        }
    }
};
