import React, { useReducer } from 'react';
import { Column } from './Column';
import { BoardActions, initialTasks, taskReducer } from '../taskReducer';

const Board = () => {
    const [columnArray, dispatch] = useReducer(taskReducer, initialTasks);

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
            <div className={'flex gap-1 justify-start items-start'}>
                {/*{columnArray.map((item) => (*/}
                {/*    <Column*/}
                {/*        key={item.id}*/}
                {/*        columnItem={item}*/}
                {/*        dispatch={dispatch}*/}
                {/*    />*/}
                {/*))}*/}
                <Column columnItem={columnArray[0]} dispatch={dispatch} />
                <Column columnItem={columnArray[1]} dispatch={dispatch} />
            </div>
        </div>
    );
};

export default Board;
