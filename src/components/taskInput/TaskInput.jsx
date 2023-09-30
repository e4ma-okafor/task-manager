/* eslint-disable react/prop-types */
import './taskInput.css'

const TaskInput = ({ isOpen, onClose, onAddTask, newTask, onTaskChange, isEditing }) => {    
    const handleSubmit = (e) => {
        e.preventDefault();       

        if (!newTask.name.trim()) {
            alert('Task name is required!');                        
            return;
        }

        if (!newTask.details.trim()) {
            alert('Task details is required!');
            return;
        }

        if (!newTask.dueDate.trim()) {
            alert('Please enter a due date');
            return;
        }
        onAddTask();
    }

    return (
        isOpen && (
            <>
                <div className='w-100'>
            <div className="taskContainer">
                <div className='d-flex justify-content-between align-items-center mb-3'>
                    <h3>Add New Task</h3>
                    <button className='cancelBtn' onClick={onClose}>
                        &times;
                    </button>    
                </div>  
                <form onSubmit={handleSubmit}>
                <div className='d-flex flex-column mb-3 gap-2'>
                    <label htmlFor="name">Task Name</label>
                    <input type="text"
                     id="name"
                     name='name'
                     className='formInput' 
                     placeholder='Enter task name'
                     value={newTask.name}
                     onChange={(e) => onTaskChange('name', e.target.value)}                     
                    />                                        
                </div>
                <div className='d-flex flex-column mb-3 gap-2'>
                    <label htmlFor="desc">Task Description</label>
                    <textarea
                     name="desc" id="desc" 
                     className='formInput' placeholder='Task Description' 
                     cols="30" rows="10"
                     value={newTask.details}
                     onChange={(e) => onTaskChange('details', e.target.value)}
                    ></textarea>                    
                </div>
                <div className='d-flex flex-column mb-3 gap-2'>
                    <label htmlFor="dueDate">Due Date</label>
                    <input type="date" name="date"
                     id="dueDate" className='formInput' 
                     placeholder='dd/mm/yyy'
                     value={newTask.dueDate}
                     onChange={(e) => onTaskChange('dueDate', e.target.value)}
                    />                    
                </div>
                <div>
                    <button type='submit' className='btn'>
                        {isEditing ? 'Save' : 'Add Task'}
                    </button>                  
                </div>
                </form>                                                           
            </div>            
            </div>            
            </>
        )
    )
}

export default TaskInput