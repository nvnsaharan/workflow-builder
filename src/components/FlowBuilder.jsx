import React, { useEffect } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background
} from 'reactflow';
import useStore from '../store/store';
import TextNode from './AllNodes/TextNode';
import 'reactflow/dist/style.css';
import SideBar from './SideBar/SideBar';
import DownloadButton from './DownloadButton/DownloadButton';

const nodeTypes = { textNode: TextNode };

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  setEdges: state.setEdges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  setReactFlowInstance: state.setReactFlowInstance,
  restoreProject: state.restoreProject
});
 
const FlowBuilder = ()  => {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, setReactFlowInstance, restoreProject } = useStore(selector);

  useEffect(() => {
    restoreProject()
  }, [])
  
 
  const canAddEdge = (connection) => {
    for (const edge of edges) {
      if (edge.source === connection.source) {
        return
      }
    }
    onConnect(connection)
  };
 
  return (
    <div className='main-page-div'>
      <div style={{ width: '80vw', height: '90vh' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={canAddEdge}
          nodeTypes={nodeTypes}
          onInit={setReactFlowInstance}
        >
          <Controls />
          <MiniMap />
          <Background color="#808080" variant="dots" gap={12} size={1} />
          <DownloadButton />
        </ReactFlow>
      </div>
      <div style={{ width: '20vw', height: '90vh' }}>
        <SideBar />
      </div>
    </div>
  );
}

export default FlowBuilder