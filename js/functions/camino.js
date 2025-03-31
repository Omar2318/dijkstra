export default (nodos,fin) => {
    let actual = fin;
    try{
        const camino = [nodos[fin].indice];
        while(true){
            if(nodos[actual].predecesor == '-')
                break;

            camino.push(nodos[actual].predecesor);
            actual = nodos[actual].predecesor;
        }
        return camino;
        
    }catch(e){
        alert('No hay un camino para llegar a ese nodo');
    }

    
}