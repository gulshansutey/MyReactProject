import { createContext, useReducer, useState } from "react";
import { TaskOptions } from "../data/StaticDataSource"
import TaskOptionModel from "../models/TaskOptionModel";
export const TaskOptionsContext = createContext({
    hasState: false,
    options: [],
    update: (id, data, label) => { },
    clear: (id) => { },
    reset: () => { }
})

function optionReducer(state, action) {
    switch (action.type) {
        case 'UPDATE':
            const index = state.findIndex((option) => option.id === action.id);
            const target = state[index];
            const updateOption = new TaskOptionModel(target.id, action.label, target.icon, true, action.data, action.label);
            const options = [...state]
            options[index] = updateOption
            return options;
        case 'CLEAR': {
            const index = state.findIndex((option) => option.id === action.id);
            const target = state[index];
            const updateOption = new TaskOptionModel(target.id, "", target.icon, false, {}, "");
            const options = [...state]
            options[index] = updateOption
            return options;
        }
        case 'RESET': {
            return TaskOptions;
        }
        default: state;
    }
}

function TaskOptionsContextProvider({ children }) {
    const [optionsState, dispatch] = useReducer(optionReducer, TaskOptions);
    const [currentState, setCurrentState] = useState(false);

    function clear(id) {
        setCurrentState(false)
        dispatch({ type: 'CLEAR', id: id })
    }

    function update(id, data, label) {
        setCurrentState(true)
        dispatch({ type: 'UPDATE', id: id, data: data, label: label })
    }
    function reset() {
        dispatch({ type: 'RESET' })
    }

    const value = {
        clear: clear,
        update: update,
        options: optionsState,
        hasState: currentState,
        reset: reset
    }

    return <TaskOptionsContext.Provider value={value}>
        {children}
    </TaskOptionsContext.Provider>
}

export default TaskOptionsContextProvider;
