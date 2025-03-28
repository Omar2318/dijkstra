export default (nodos,fin) => {
    let actual = fin;
    const camino = [nodos[fin].indice];
    while(true){
        if(nodos[actual].predecesor == '-')
            break;

        camino.push(nodos[actual].predecesor);
        actual = nodos[actual].predecesor;
    }

    return camino;
}