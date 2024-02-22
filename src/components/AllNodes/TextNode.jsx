import { useCallback } from 'react';
import { Handle, Position, useNodeId, useNodes  } from 'reactflow';
import './TextNode.css'
import useStore from '../../store/store';

const selector = (state) => ({
  onSelectNode: state.onSelectNode,
  nodes: state.nodes
});

function TextNode({ data, isConnectable }) {
  const { onSelectNode, nodes } = useStore(selector)
  const nodeId = useNodeId()

  function handleClick(){
    const currentNode = nodes.filter(node => node.id == nodeId)
    onSelectNode(currentNode[0])
  }

  return (
    <div className="text-updater-node" onClick={() => handleClick()}>
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} />
      <div className='main-div'>
        <h3 className='text-heading'>{data?.heading || "--"}</h3>
        <p>{data?.content || "--"}</p>
      </div>
      <Handle type="source" position={Position.Right} isConnectable={isConnectable} />
    </div>
  );
}

export default TextNode;
