import { useState } from 'react';
import './App.css'
import TaskInput from './components/taskInput/TaskInput';
import Task from './components/taskDetails';

const App = () => {
    const today = new Date(); 

    const [showTaskInput, setShowTaskInput] = useState(false);
    const [allTasks, setAllTasks] = useState([]);    
    const [taskToEdit, setTaskToEdit] = useState(null);    

    const handleAddTask = (task) => {
        if (taskToEdit !== null) {
            const updatedTasks = allTasks.map((t, index) => (index === taskToEdit ? task : t));
            setAllTasks(updatedTasks);
            setTaskToEdit(null);
        } else {
            setAllTasks([...allTasks, task]);
        }
        setShowTaskInput(false);
    }

    const handleEditTask = (index) => {
        setTaskToEdit(index);
        setShowTaskInput(true);
    };

    const handleDeleteTask = (index) => {
        const updatedTasks = allTasks.filter((_,i) => i !== index);
        setAllTasks(updatedTasks);
    }

    const handleDeleteAllTasks = () => {
        setAllTasks([]);
    }
    return (
        <>
            <div className='container'>
                <header>
                    <div className='mb-3'>
                        <h2>Welcome</h2>                        
                    </div>
                    <div className='mb-3 d-flex justify-content-between'>
                        <p>Today is {today.toDateString()}</p> 
                        <button className='btn addBtn position-fixed'
                         onClick={() => setShowTaskInput(true)}>+</button>                       
                    </div>
                </header> 
                <main>
                    <div className='d-flex justify-content-center align-items-center'>
                        {showTaskInput ? (
                            <TaskInput
                              handleAddTask={handleAddTask}
                              onCancel={() => setShowTaskInput(false)}
                              initialData={taskToEdit !== null ? allTasks[taskToEdit] : null}
                              isEditing={taskToEdit !== null}  
                            />
                        ) : (
                            allTasks.length === 0 && (
                                <p style={{ marginTop: '60px'}}>All tasks done. Click the button to add a task.</p>
                            )
                        )}
                    </div>
                    <div>
                        {allTasks.length > 0 && ( 
                                <Task                                       
                                 allTasks={allTasks}
                                 onEdit={handleEditTask}
                                 onDelete={handleDeleteTask}
                                 onDeleteAll={handleDeleteAllTasks} 
                                />                                  
                            )
                        }                                                    
                    </div>                   
                </main>                             
            </div>              
        </>
    )
}

export default App