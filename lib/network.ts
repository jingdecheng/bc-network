import { 
  graphs,
  INetwork, 
  NetworkType } from "@/store/networks";
import Graph from "graphology";
import {
  generateNeighborLabel as generateCrossedNeighborLabel, 
  isEdgeByDimension as isCrossedEdgeByDimension } from "./crossedcube";
import { 
  generateNeighborLabel as generateHyperNeighborLabel,
  isEdgeByDimension as isHyperEdgeByDimension } from "./hypercube";

export const getEdgeByDimension = (network:string, dimension: number, node?:string)=>{
  console.log('get edges by dimension')
  const graph = graphs.get(network) as Graph
  const type = graph.getAttribute('type')

  return graph.filterEdges((edge)=>{

    if(node && !graph.hasExtremity(edge, node)){
      return false
    } 
    const [nodeX, nodeY] = graph.extremities(edge)
    const labelX = graph.getNodeAttribute(nodeX, 'label')
    const labelY = graph.getNodeAttribute(nodeY, 'label')

    switch(type) {
      case NetworkType.HYPER:
        return isHyperEdgeByDimension(labelX, labelY, dimension)
      case NetworkType.CROSSED:
        return isCrossedEdgeByDimension(labelX, labelY, dimension)
    }
  })
}


export const buildNetwork = (network:INetwork, type: string, start?:string) =>{

  const graph = graphs.get(network.key) as Graph
  const dimension = graph.getAttribute('dimension')
  
  graph.updateAttributes(attr=>({
    ...attr,
    type,
  }))

  graph.clearEdges()


  const labels = Array.from({length: Math.pow(2,dimension)}, (value, key)=>{
    let label:string = key.toString(2)
    return '0'.repeat(dimension-label.length)+ label
  })

  //label nodes
  if(start){
    graph.updateNodeAttribute(start, 'label', oldVal=>labels.shift())
  }

  graph.forEachNode((node)=>{
    graph.updateNodeAttribute(node, 'label', oldVal=>node !== start? labels.shift(): oldVal)
  })

  //connect nodes
  graph.forEachNode((node,{label})=>{
    const neighborLabel = new Set(Array.from({length:dimension},(_, key)=>{
      switch(type){
        case NetworkType.HYPER:
          return generateHyperNeighborLabel(label,key+1)
        case NetworkType.CROSSED:
          return generateCrossedNeighborLabel(label, key+1)
      }
    }))

    console.log('neighborLabel', neighborLabel)

    const neighbors = graph.filterNodes((node, {label})=>{
      return neighborLabel.has(label)
    })

    for(const neighbor of neighbors){
      if(graph.hasEdge(node, neighbor) || graph.hasEdge(neighbor, node)){
        continue
      }
      graph.addEdge(node, neighbor,{size:5})
    }
  })
}


export const validateNodes = (network:string)=>{
  const graph = graphs.get(network) as Graph
  const dimension = graph.getAttribute("dimension")
  const labels = new Set(Array.from({length: Math.pow(2,dimension)}, (value, key)=>{
    let label:string = key.toString(2)
    return '0'.repeat(dimension-label.length)+ label
  }))

  graph.forEachNode((node,{label})=>{
    if(labels.has(label)){
      labels.delete(label)
    }
  })

  return Array.from(labels)
}

export const getISTs =(network:string, root:string)=>{
  
}