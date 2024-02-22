import React from 'react'
import './TopBar.css'
import useStore from '../../store/store'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const selector = (state) => ({
  nodes: state.nodes, 
  edges: state.edges,
  startNewProject: state.startNewProject,
  onSaveProject: state.onSaveProject
})



function TopBar() {
  const {nodes, edges, startNewProject, onSaveProject} = useStore(selector)

  // check if only one node is not present as target in edges
  const findNodeNotInEdges = (nodes, edges) => {
    const targetIdsInEdges = new Set(edges.map(edge => edge.target));
    const nodesNotInEdges = nodes.filter(node => !targetIdsInEdges.has(node.id));
    return nodesNotInEdges.length === 1;
  };

  // save if not present and success
  const handleSave = () => {
    if (findNodeNotInEdges(nodes, edges)){
      onSaveProject()
      toast.success("Project saved successfully!",{
        position: "top-center",
      });
      console.log("first")
    } else {
      toast.error("Cannot save: Only One Node Can be a Main Source Node.",{
        position: "top-center",
      });
    }
  }

  return (
    <div className='top-bar-main-div'>
      <ToastContainer />
      <button className='new-project-button' type="button" onClick={startNewProject}>New Project</button>
      <button className='save-changes-button' type="button" onClick={handleSave}>Save Changes</button>
    </div>
  )
}

export default TopBar