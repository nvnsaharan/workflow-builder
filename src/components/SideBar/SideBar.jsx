import React from 'react'
import useStore from '../../store/store';
import UpdateForm from '../UpdateForm/UpdateForm';
import NodeList from '../NodeList/NodeList';

const selector = (state) => ({
  selectedNode: state.selectedNode,
});

function SideBar() {
  const { selectedNode } = useStore(selector)

  return (
    <>
      {selectedNode ? 
        <UpdateForm selectedNode={selectedNode} /> :
        <NodeList />
      }
    </>
  )
}

export default SideBar