import { useReducer, useState } from 'react';
import './App.css'
import TaskInput from './components/taskInput/TaskInput';
import Task from './components/taskDetails';
import { reducer } from './reducer';

const defaultState = {
    tasks: [],
    isModalOpen: false,    
    selectedTaskIndex: null
};

const App = () => {
    const today = new Date();

    const taskData = {
        name: '',
        details: '',
        dueDate: ''
    }

    const [state, dispatch] = useReducer(reducer, defaultState);
    const [newTask, setNewTask] = useState(taskData);
    const [isEditing, setIsEditing] = useState(false);   

    const openModal = () => {
        setIsEditing(false);
        dispatch({ type: 'OPEN_MODAL' });               
    }     

    const closeModal = () => {
        setIsEditing(false);
        dispatch({ type: 'CLOSE_MODAL' });
    }

    const addTask = () => {
        if (isEditing) {
            dispatch({ type: 'UPDATE_TASK', payload: newTask })
        } else {
            dispatch({ type: 'ADD_TASK', payload: newTask });
        }
        setNewTask(taskData);
        setIsEditing(false);
    }

    const editTask = (taskIndex, task) => {
        setIsEditing(true);
        dispatch({ type: 'EDIT_TASK', payload: taskIndex });
        setNewTask(task);
    };

    const deleteTask = (taskIndex) => {
        dispatch({ type: 'DELETE_TASK', payload: taskIndex});
    };

    const updateTaskField = (field, value) => {
        setNewTask({
            ...newTask,
            [field]: value
        })
    }

    const deleteAllTasks = () => dispatch({ type: 'DELETE_ALL_TASKS'});

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
                         onClick={openModal}>+
                        </button>                       
                    </div>
                </header> 
                <main>
                    {
                        state.isModalOpen ? (
                            <TaskInput
                              isOpen={state.isModalOpen}
                              onClose={closeModal}
                              onAddTask={addTask}
                              newTask={newTask}
                              onTaskChange={updateTaskField}
                              isEditing={isEditing}
                            />
                        ) : (
                            state.tasks.length === 0 && (
                                <p style={{ marginTop: '60px'}}>All tasks done. Click the button to add a task.</p>
                            )
                        )
                    } 
                    {
                        state.tasks.length > 0 && (
                            <Task
                              tasks={state.tasks}
                              onEditTask={editTask}
                              onDeleteTask={deleteTask}
                              onDeleteAllTasks={deleteAllTasks}
                            />
                        )
                    }                 
                </main>                             
            </div>              
        </>
    )
}

export default App