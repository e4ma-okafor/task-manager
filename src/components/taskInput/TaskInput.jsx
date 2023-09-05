import { useEffect, useState } from 'react';
import './taskInput.css'
import propTypes from 'prop-types';

const TaskInput = ({ initialData, handleAddTask, onCancel, isEditing }) => {
    let taskData = {name: '', date: '', desc: ''};

    const [task, setTask] = useState(initialData || taskData); 
    const [focusInput, setFocusInput] = useState(false);

    useEffect(() => {
        if(isEditing) {
            setFocusInput(true);
        }
    }, [isEditing]);
    
    const onSubmit = (e) => {
        e.preventDefault();              

        if (!task.name.trim()) {
            alert('Please enter task details')
            return
        }
        if (!task.desc.trim()) {
            alert('Please enter task description')
            return
        }
        if (!task.date.trim()) {
            alert('Please enter task due date')
            return
        }
        setTask({name: '', desc: '', date: ''})         
        handleAddTask(task);       
    }      
    return (
        <>
            <div className='w-100'>
            <div className="taskContainer">
                <div className='d-flex justify-content-between align-items-center mb-3'>
                    <h3>Add New Task</h3>
                    <button className='cancelBtn' onClick={onCancel}>
                        X
                    </button>    
                </div>  
                <form onSubmit={onSubmit}>
                <div className='d-flex flex-column mb-3 gap-2'>
                    <label htmlFor="name">Task Name</label>
                    <input type="text"
                     id="name"
                     name='name'
                     className='formInput' 
                     placeholder='Enter task name'
                     value={task.name}
                     onChange={(e) => setTask({...task, name: e.target.value})}
                     autoFocus={focusInput}
                    />
                </div>
                <div className='d-flex flex-column mb-3 gap-2'>
                    <label htmlFor="desc">Task Description</label>
                    <textarea
                     name="desc" id="desc" 
                     className='formInput' placeholder='Task Description' 
                     cols="30" rows="10"
                     value={task.desc}
                     onChange={(e) => setTask({...task, desc: e.target.value})}
                    ></textarea>
                </div>
                <div className='d-flex flex-column mb-3 gap-2'>
                    <label htmlFor="dueDate">Due Date</label>
                    <input type="date" name="date"
                     id="dueDate" className='formInput' 
                     placeholder='dd/mm/yyy'
                     value={task.date}
                     onChange={(e) => setTask({...task, date: e.target.value})}
                    />
                </div>
                <div>
                    {isEditing ? (
                        <button className='btn'>
                            Save
                        </button>
                    ) : (
                        <button className='btn'>
                            Add Task
                        </button>
                    )}                    
                </div>
                </form>                                                           
            </div>            
            </div>
        </>
    )
}

TaskInput.propTypes = {
    handleAddTask: propTypes.func,    
    onCancel: propTypes.func,
    initialData: propTypes.object,
    isEditing: propTypes.bool  
}

export default TaskInput