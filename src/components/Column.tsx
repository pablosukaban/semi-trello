import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TitleComponent } from './TitleComponent';
import { BoardActions, BoardActionTypes, BoardType } from '../taskReducer';
import { TaskListComponent } from './TaskListComponent';

export type TaskType = {
    id: string;
    value: string;
    done: boolean;
};

type ColumnProps = {
    columnItem: BoardType;
    dispatch: (action: BoardActionTypes) => void;
};

export const Column: React.FC<ColumnProps> = ({ columnItem, dispatch }) => {
    const [task, setTask] = useState('');

    // const [currentTask, setCurrentTask] = useState<TaskType>({
    //     id: uuidv4(),
    //     value: '',
    //     done: false,
    // });

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

    // const handleDragStart = (id: string) => {
    //     const foundTask = columnItem.itemsList.find((item) => item.id === id);
    //     if (!foundTask) return;
    //     setCurrentTask(foundTask);
    // };
    //
    // const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    //     e.preventDefault();
    // };

    return (
        <div
            className={
                'flex-shrink-0 flex flex-col justify-center items-center  border-2 rounded'
            }
        >
            <TitleComponent title={columnItem.title} />
            <textarea
                placeholder={'Добавьте задачу!'}
                wrap={'soft'}
                className={'w-full p-2 border rounded break-words resize-none'}
                rows={1}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                value={task}
            />
            <TaskListComponent columnItem={columnItem} dispatch={dispatch} />
        </div>
    );
};
