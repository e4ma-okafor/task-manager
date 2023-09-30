export const reducer = (state, action) => {
    if (action.type === 'OPEN_MODAL') {
        return {...state, isModalOpen: true};
    }

    if (action.type === 'CLOSE_MODAL') {
        return {...state, isModalOpen: false};
    }

    if (action.type === 'ADD_TASK') {
        return {
            ...state,
            tasks: [...state.tasks, action.payload],
            isModalOpen: false,
            newTask: { name: '', details: '', dueDate: '' }
        };
    }    

    if (action.type === 'EDIT_TASK') {
        return {
            ...state,
            isModalOpen: true,
            selectedTaskIndex: action.payload,
            newTask: state.tasks[action.payload]
        };
    }

    if (action.type === 'UPDATE_TASK') {
        const updatedTasks = [...state.tasks];
        updatedTasks[state.selectedTaskIndex] = action.payload;
        return {
            ...state,
            isModalOpen: false,
            tasks: updatedTasks,
            selectedTaskIndex: null
        }
    }

    if (action.type === 'DELETE_TASK') {
        const updatedTasks = state.tasks.filter((task, index) => index !== action.payload);
        return {
            ...state,
            tasks: updatedTasks
        };
    }

    if (action.type === 'UPDATED_TASK_FIELD') {
        return {
            ...state,
            newTask: {
                ...state.newTask,
                [action.payload.field]: action.payload.value
            }
        };
    }

    if (action.type === 'DELETE_ALL_TASKS') {
        return {
            ...state,
            tasks: []
        };
    }
    return state;
}
