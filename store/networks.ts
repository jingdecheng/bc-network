import { hypercube } from "@/lib/graph";
import Graph from "graphology";
import produce from "immer";
import { create } from "zustand";

export enum NetworkType {
  HYPER,
  CROSSED,
  TWISIED,
}

export interface INetwork {
  key: string
  name: string
  type: string
  graph: Graph
}



interface NetworkState {
  networks: INetwork[]
  openedNetwork: INetwork | null
  addNetwork: (network: INetwork) =>void
  deleteNetwork: (network: string, index:number) => void
  openNetwork: (network: INetwork) => void
  closeNetwork: (network: string) => void
}

const initialState = [
  {
    key: 'hyper-1',
    name: 'hypercube-1',
    type: 'hyper',
    graph: hypercube
  }
] as INetwork[]

export const useNetworkStore = create<NetworkState>((set)=>({
  networks: initialState,
  openedNetwork: null ,
  addNetwork: (network)=>set(produce((state:NetworkState)=>{
    console.log('add network')
    state.networks.push(network)
  })),
  deleteNetwork: (network, index)=> set(produce((state: NetworkState)=>{
    state.networks.splice(index, 1)
  })),
  openNetwork: (network)=>set(produce((state)=>{
    state.openedNetwork = network
  })),
  closeNetwork: (network)=>null
}))

