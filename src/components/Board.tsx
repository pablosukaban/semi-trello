import React, { useReducer } from 'react';
import { Column } from './Column';
import { BoardActions, initialTasks, taskReducer } from '../taskReducer';

const Board = () => {
    const [columnsArray, dispatch] = useReducer(taskReducer, initialTasks);

    const handleAddColumn = () => {
        dispatch({ type: BoardActions.BOARD_ADDED });
    };

    const handleRemoveColumn = () => {
        dispatch({ type: BoardActions.BOARD_REMOVED });
    };

    return (
        <div className={'flex flex-col justify-start items-start'}>
            <button onClick={handleAddColumn}>Add</button>
            <button onClick={handleRemoveColumn}>Remove</button>
            <div className={'flex justify-start items-start'}>
                {columnsArray.map((item) => (
                    <Column
                        key={item.id}
                        columnItem={item}
                        dispatch={dispatch}
                    />
                ))}
            </div>
        </div>
    );
};

export default Board;
