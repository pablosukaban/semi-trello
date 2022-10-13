import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TitleComponent } from './TitleComponent';
import { BoardActions, BoardActionTypes, ColumnType } from '../taskReducer';
import { TaskListComponent } from './TaskListComponent';
import { InputComponent } from './InputComponent';

export type TaskType = {
    id: string;
    value: string;
    done: boolean;
};

type ColumnProps = {
    columnItem: ColumnType;
    dispatch: (action: BoardActionTypes) => void;
};

export const Column: React.FC<ColumnProps> = ({
    columnItem,
    dispatch,
}) => {
    const [task, setTask] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTask(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.code === 'Enter') {
            e.preventDefault();
            dispatch({
                type: BoardActions.TASK_ADDED,
                columnId: columnItem.id,
                newTask: {
                    id: uuidv4(),
                    done: false,
                    value: task,
                },
            });
            setTask('');
        }
    };

    return (
        <div
            className={
                'flex-shrink-0 flex flex-col justify-center items-center  border-2 rounded'
            }
        >
            <TitleComponent
                title={columnItem.title}
                columnId={columnItem.id}
                dispatch={dispatch}
            />
            <InputComponent
                value={task}
                handleInputChange={handleInputChange}
                handleKeyDown={handleKeyDown}
            />
            <TaskListComponent
                columnItem={columnItem}
                dispatch={dispatch}
            />
        </div>
    );
};
