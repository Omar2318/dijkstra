let grafo = cytoscape({
    container: document.getElementById('grafo'),
    elements: [],
    style: [
      { selector: 'node', style: { 'background-color': 'blue', 'label': 'data(id)' } },
      { 
        selector: 'edge', 
        style: { 
          'line-color': 'black', 
          'width': 2, 
          'label': 'data(weight)',
          'curve-style': 'bezier',
          'target-arrow-shape': 'triangle',
          'target-arrow-color': 'black'
        } 
      }
    ],
    layout: { name: 'preset' } // Usamos preset para respetar la posición asignada
  });
  
  let nodoSeleccionado = null;
  let edgeSeleccionada = null;
  let contadorNodo = 0;
  
  grafo.on('tap', 'node', function(evt) {
    nodoSeleccionado = evt.target.id();
    edgeSeleccionada = null;
    let menu = document.getElementById('menu');
    menu.innerHTML = `
      <button onclick="agregarArista(true)">Agregar Arista Dirigida</button>
      <button onclick="agregarArista(false)">Agregar Arista No Dirigida</button>
      <button onclick="borrarNodo()">Borrar Nodo</button>
      <button onclick="cancelarSeleccion()">Cancelar</button>
    `;
    menu.style.display = 'block';
    menu.style.left = evt.renderedPosition.x + 'px';
    menu.style.top = evt.renderedPosition.y + 'px';
  });
  
  grafo.on('tap', 'edge', function(evt) {
    edgeSeleccionada = evt.target;
    nodoSeleccionado = null;
    let menu = document.getElementById('menu');
    menu.innerHTML = `
      <button onclick="modificarPesoArista()">Modificar Peso</button>
      <button onclick="borrarArista()">Borrar Arista</button>
      <button onclick="cancelarSeleccion()">Cancelar</button>
    `;
    menu.style.display = 'block';
    menu.style.left = evt.renderedPosition.x + 'px';
    menu.style.top = evt.renderedPosition.y + 'px';
  });
  
  function agregarNodo() {
    if (contadorNodo < 26) {
      let nombre = String.fromCharCode(65 + contadorNodo);
      if (!grafo.getElementById(nombre).length) {
        let contenedor = document.getElementById('grafo');
        let centerX = contenedor.offsetWidth / 2;
        let centerY = contenedor.offsetHeight / 2;
        grafo.add({ 
          data: { id: nombre },
          position: { x: centerX, y: centerY }
        });
        contadorNodo++;
      }
    } else {
      alert("No se pueden agregar más de 26 nodos.");
    }
  }
  
  function agregarArista(dirigida) {
    let destino = prompt("Ingrese el nodo destino:");
    if (destino && grafo.getElementById(destino).length && nodoSeleccionado) {
      let peso = parseInt(prompt("Ingrese el peso de la arista:"), 10);
      if (!isNaN(peso)) {
        let arista = {
          data: { source: nodoSeleccionado, target: destino, weight: peso }
        };
        if (dirigida) {
          arista.data.directed = true;
          arista.style = { 'target-arrow-shape': 'triangle' };
          grafo.add(arista);
        } else {
          grafo.add(arista);
          grafo.add({ data: { source: destino, target: nodoSeleccionado, weight: peso } });
        }
      }
    }
    cancelarSeleccion();
  }
  
  function borrarNodo() {
    if (nodoSeleccionado) {
      grafo.getElementById(nodoSeleccionado).remove();
    }
    cancelarSeleccion();
  }
  
  function modificarPesoArista() {
    if (edgeSeleccionada) {
      let nuevoPeso = prompt("Ingrese el nuevo peso para la arista:");
      nuevoPeso = parseInt(nuevoPeso, 10);
      if (!isNaN(nuevoPeso)) {
        edgeSeleccionada.data('weight', nuevoPeso);
        if (!edgeSeleccionada.data('directed')) {
          grafo.edges().filter(function(edge) {
            return edge.data('source') === edgeSeleccionada.data('target') &&
                   edge.data('target') === edgeSeleccionada.data('source') &&
                   !edge.data('directed');
          }).forEach(function(e) {
            e.data('weight', nuevoPeso);
          });
        }
      }
    }
    cancelarSeleccion();
  }
  
  function borrarArista() {
    if (edgeSeleccionada) {
      let source = edgeSeleccionada.data('source');
      let target = edgeSeleccionada.data('target');
      let directed = edgeSeleccionada.data('directed');
      edgeSeleccionada.remove();
      if (!directed) {
        grafo.edges().filter(function(edge) {
          return edge.data('source') === target &&
                 edge.data('target') === source &&
                 !edge.data('directed');
        }).remove();
      }
    }
    cancelarSeleccion();
  }
  
  function cancelarSeleccion() {
    nodoSeleccionado = null;
    edgeSeleccionada = null;
    document.getElementById('menu').style.display = 'none';
  }
  