import React, { useState } from 'react'
import './UpdateForm.css'
import useStore from '../../store/store';

const selector = (state) => ({
  updateNodeData: state.updateNodeData,
  unSelectNode: state.unSelectNode,
  onDeleteNode: state.onDeleteNode
});

function UpdateForm({ selectedNode }) {
  const {updateNodeData, unSelectNode, onDeleteNode} = useStore(selector)
  const data = selectedNode.data;
  const [heading, setHeading] = useState(data.heading || "--")
  const [content, setContent] = useState(data.content || "--")

  // update node and unselect it
  const handleUpdateNode = () => {
    const node = {...selectedNode, data : {heading, content}}
    updateNodeData(node)
    unSelectNode()
  }

  // delete node and unselect it
  const handleDelete = () => {
    onDeleteNode(selectedNode)
    unSelectNode()
  }

  return (
    <div className='update-form-text'>
      <h2>Message Box</h2>
      <input type="text" value={heading} onChange={e => setHeading(e.target.value)} />
      <textarea type="text" value={content} onChange={e => setContent(e.target.value)} />
      <button type="button" onClick={handleUpdateNode}>Update Message</button>
      <button type="button" className='delete-button' onClick={handleDelete}>Delete Node</button>
      <button type="button" className='cancel-button' onClick={unSelectNode}>Cancel</button>
    </div>
  )
}

export default UpdateForm