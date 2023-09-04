import { useState } from 'react'
import './task.css'
import propTypes from 'prop-types'

const Task = ({ allTasks, onEdit, onDelete, onDeleteAll }) => {
    const [taskComplete, setTaskComplete] = useState([]);    

    const taskCompleted = (taskId) => {
        if (taskComplete.includes(taskId)) {
            setTaskComplete(taskComplete.filter((id) => id !== taskId))
        } else {
            setTaskComplete([...taskComplete, taskId]);
        }
    } 
    return (
        <>
            <div style={{ marginTop: '50px'}} className='d-flex justify-content-between w-50'>
                <h2>Tasks</h2>
                <button className='btn deleteTasksBtn' onClick={onDeleteAll}>Delete Tasks</button>
            </div>
            <div className='task' style={{ marginTop: '40px'}}>                
                <ul>
                    {
                        allTasks.map((task, index) => (
                            <li key={index} style={{ marginBottom: '20px'}}>
                                <div className='d-flex justify-content-between mb-3'>
                                    <div className='d-flex gap-2'>
                                        <input type="checkbox" 
                                         checked={taskComplete.includes(index)}
                                         onChange={() => taskCompleted(index)}
                                        />
                                        {taskComplete.includes(index) && <p style={{ color: 'green'}}>Done</p>}
                                    </div>
                                    <p className='date'>Due date: {task.date}</p>                    
                                </div>                                    
                                <div className='mb-3'>
                                    <h3 className='mb-3'>{task.name}</h3>
                                    <p>{task.desc}</p>
                                </div>
                                <div className='d-flex justify-content-right gap-4'>
                                    <button className='btn editBtn' onClick={() => onEdit(index)}>Edit</button>
                                    <button className='btn' onClick={() => onDelete(index)}>Delete</button>
                                </div>                                         
                            </li>
                        ))
                    }                
                </ul>
            </div>
        </>
    )
}

Task.propTypes = {
  allTasks: propTypes.array,
  onEdit: propTypes.func,
  onDelete: propTypes.func,
  onDeleteAll: propTypes.func
}

export default Task