import React, { useEffect, useRef, useState } from 'react'
import useStore from '../../store/store';
import './NodeList.css'

const selector = (state) => ({
  nodes: state.nodes,
  setNodes: state.setNodes,
  counter: state.counter,
  setCounter: state.setCounter,
  reactFlowInstance: state.reactFlowInstance
});

function NodeList() {
  const buttonRef = useRef(null);

  const { nodes, setNodes, counter, setCounter, reactFlowInstance } = useStore(selector)
  const [targetPosition, setTargetPosition] = useState(null)

  // check the position relative to reactflow and it can be zoomed
  useEffect(() => {
    if (targetPosition){
      const position = reactFlowInstance?.screenToFlowPosition({
        x: targetPosition.x,
        y: targetPosition.y,
      });
      addNewNode(position.x, position.y)
      setTargetPosition(null)
    }
  }, [targetPosition])

  // handle drag and drop
  useEffect(() => {
    const button = buttonRef.current;
    button.draggable = true;
    const handleDragEnd = (event) => {
      event.preventDefault();
      setTargetPosition({ x: event.clientX, y: event.clientY });
    };
    button.addEventListener('dragend', handleDragEnd);
    return () => {
      button.removeEventListener('dragend', handleDragEnd);
    };
  }, []);

  // add custom node in nodes
  const addNewNode = (clientX , clientY) => {
    setNodes([...nodes, { 
      id: Date.now().toString(),
      type: 'textNode',
      sourcePosition: 'right',
      targetPosition: 'left', 
      position: { x: clientX ?  clientX - 50 : (counter%10) * 150 + 200, y: clientY ? clientY - 30 : (counter%11) * 70 }, 
      data: { 
        heading: "heading " + (counter).toString(),
        content: "message " + (counter).toString()
       } 
    }])
    setCounter(counter + 1)
  }

  return (
    <div className='node-list-div'>
      <button className='add-text-node-button' type="button" ref={buttonRef} onClick={() => addNewNode()}>
        <img src="/msg.png" alt="text" />
          Message
      </button> 
    </div>
  )
}

export default NodeList