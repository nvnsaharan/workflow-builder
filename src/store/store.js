import { create } from 'zustand';
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
} from 'reactflow';

// Initial nodes and edges data
const initialNodes = [
  {
    id: "1",
    type: 'textNode',
    sourcePosition: 'right',
    targetPosition: 'left',
    position: { x: 100, y: 100 },
    data: {
      heading: "heading 1",
      content: "message 1"
    }
  }
];

const initialEdges = [];

// Creating custom hook with Zustand
const useStore = create((set, get) => ({
  counter: 2,
  selectedNode: null,
  reactFlowInstance: null,
  setReactFlowInstance: (reactFlowInstance) => {
    set({ reactFlowInstance })
  },
  nodes: initialNodes,
  edges: initialEdges,
  onSelectNode: (selectedNode) => {
    set({ selectedNode })
  },
  setCounter: (counter) => {
    set({ counter })
  },
  unSelectNode: () => {
    set({ selectedNode: null })
  },
  updateNodeData: (node) => {
    const nodesCopy = JSON.parse(JSON.stringify(get().nodes));
    const nodeIndex = nodesCopy.findIndex(n => n.id === node.id);
    if (nodeIndex === -1)
    {
      console.warn(`Node with ID ${node.id} not found in nodes array. Skipping update.`);
      return;
    }
    nodesCopy[nodeIndex] = {
      ...nodesCopy[nodeIndex],
      ...node,
    };
    set({ nodes: nodesCopy });
  },
  onDeleteNode: (node) => {
    const nodesCopy = JSON.parse(JSON.stringify(get().nodes));
    const nodeIndex = nodesCopy.findIndex(n => n.id === node.id);
    if (nodeIndex === -1)
    {
      console.warn(`Node with ID ${node.id} not found in nodes array. Skipping deletion.`);
      return;
    }
    nodesCopy.splice(nodeIndex, 1);
    set({ nodes: nodesCopy });
  },
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection) => {
    connection = {...connection, markerEnd: { type: 'arrowclosed' }, animated: true,}
    set({
      edges: addEdge(connection, get().edges),
    });
  },
  setNodes: (nodes) => {
    set({ nodes });
  },
  setEdges: (edges) => {
    set({ edges });
  },
  startNewProject: () => {
    set({ nodes: initialNodes, edges: initialEdges, counter: 2, selectedNode: null })
    localStorage.removeItem("user-workflow")
  },
  onSaveProject: () => {
    const reactFlowInstance = get().reactFlowInstance
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();
      localStorage.setItem("user-workflow", JSON.stringify(flow));
    }
  },
  restoreProject: async () => {
    const flow = JSON.parse(localStorage.getItem("user-workflow"));
    if (flow) {
      set({nodes: flow.nodes, edges: flow.edges})
    }
  },
}));

export default useStore;
