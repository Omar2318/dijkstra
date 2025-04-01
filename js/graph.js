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
layout: { name: 'grid' }
});

let nodoSeleccionado = null;
let contadorNodo = 0;

grafo.on('tap', 'node', function(evt) {
nodoSeleccionado = evt.target.id();
let menu = document.getElementById('menu');
menu.style.display = 'block';
menu.style.left = evt.renderedPosition.x + 'px';
menu.style.top = evt.renderedPosition.y + 'px';
});

function agregarNodo() {
    console.log('nodo')
if (contadorNodo < 26) {
  let nombre = String.fromCharCode(65 + contadorNodo); 
  if (!grafo.getElementById(nombre).length) {
      grafo.add({ data: { id: nombre } });
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
      }
      grafo.add(arista);

      if (!dirigida) {
          grafo.add({ data: { source: destino, target: nodoSeleccionado, weight: peso } });
      }
  }
}
document.getElementById('menu').style.display = 'none';
}

function borrarNodo() {
if (nodoSeleccionado) {
  grafo.getElementById(nodoSeleccionado).remove();
}
document.getElementById('menu').style.display = 'none';
}

