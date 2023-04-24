import NetworkEditor from '@/feature/Editor/NetworkEditor'
import { Button, ButtonGroup,  Center, Menu, MenuButton, MenuItemOption, MenuList, MenuOptionGroup, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { TbDimensions as DimensionIcon, TbBinaryTree as ISTsIcon } from "react-icons/tb";
import { SiGraphql as BCIcon } from "react-icons/si";
import { useNetworkStore } from '@/store/networks'
import { useNodeStore } from '@/store/nodes'
import NodeEditor from '@/feature/Editor/NodeEditor'
import { useBuilderStore } from '@/store/builder';
import { ChevronDownIcon } from '@chakra-ui/icons';




export default function ToolPanel() {

  const network = useNetworkStore((state)=>state.selected)
  const node = useNodeStore((state)=>state.selected)
  const [editorIndex, setTabIndex] = useState(0)

  useEffect(()=>{
    if(!network || !node) return
    setTabIndex(1)
  }, [node?.key])

  return (
    <>
      <Tabs 
        index={editorIndex}
        onChange={(index)=>setTabIndex(index)}
        isFitted 
        isLazy 
        size="sm" 
        minW="224px"
      >
        <TabList mb='1em'>
          <Tab>Network</Tab>
          <Tab>Node</Tab>
        </TabList>
        <TabPanels>
          <TabPanel p={0}>
            <NetworkEditor/>
          </TabPanel>
          <TabPanel p={0}>
            <NodeEditor/>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon/>} textAlign="left" pl="0">
          Builders
        </MenuButton>
        <MenuList>
          <MenuOptionGroup>
            <MenuItemOption>
              BC Network builder            
            </MenuItemOption>
            <MenuItemOption>
              Dimension Builder            
            </MenuItemOption>
            <MenuItemOption>
              ISTs Builder            
            </MenuItemOption>

          </MenuOptionGroup>
        </MenuList>
      </Menu>
    </>


  )
}
