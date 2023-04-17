import { INetwork } from "@/store/networks";
import { INode } from "@/store/nodes";
import Sigma from "sigma";
import { getEdgeByDimension } from "./network";

interface ISigma {
  render: Sigma | null;
}


export const renderSetting = {
  defaultNodeSize: 10
}



export const sigma: ISigma = {
  render: null,
} 


export const renderSelectedNode = (network:INetwork, nextNode:INode | null, preNode:INode | null)=> {
  
  console.log('render selected node', nextNode, preNode)
  const { graph } = network
  //clear previously seleced elements effect
  preNode && graph.updateNodeAttribute(preNode.key, 'highlighted', oldVal=>false)
  //render currently selected element
  nextNode && graph.updateNodeAttribute(nextNode.key, 'highlighted', oldVal=>true)

}

export const resetNetwork = (network:INetwork)=>{

}

export const renderDimension = (network:INetwork, dimension: number, color:string | null, node?: string) => {
  console.log('render dimension')
  const { graph } = network 

  const edges = getEdgeByDimension(network, dimension, node)
  for(const edge of edges){
    graph.updateEdgeAttribute(edge, 'color' ,oldVal=>color)
  }  
}
