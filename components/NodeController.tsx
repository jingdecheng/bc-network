import { sigmaState } from '@/lib/sigma'
import React, { useEffect, useState } from 'react'
import Sigma from 'sigma'

interface IProp{
  sigma: Sigma | null
  selectedNode: string | null
  setSelectedNode: (node: string | null)=>void
}

export default function NodeController({sigma, selectedNode,setSelectedNode}:IProp) {

  const [nodeDimension, setNodeDimension] = useState<string>('')



  const handleNodeDimension = (evt:React.ChangeEvent<HTMLSelectElement>) =>{
    if (!sigma) { return }

    const nodeDimension = evt.target.value
    const network = sigma.getGraph()
    const edges = network.filterEdges(selectedNode,(edge)=>{
      return network.hasExtremity(edge,selectedNode)
    })    
    console.log(edges)
    edges.forEach((edge,index)=>{
      if(index <= parseInt(nodeDimension))
      network.setEdgeAttribute(edge, 'color', '#300000')
    })

    sigma.refresh()
    setNodeDimension(nodeDimension)
  }


  return (
    <div>
      <p> selected node {selectedNode}</p>
      <p> node dimension {nodeDimension}</p>
      <select value={nodeDimension} onChange={handleNodeDimension}>
        {['1','2','3','4'].map(val =>
          <option key={val} value={val}> {val} </option>
        )}
      </select>
    </div>
  )
}
