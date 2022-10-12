import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TitleComponent } from './TitleComponent';
import { TaskComponent } from './TaskComponent';
import { BoardActions, BoardActionTypes, BoardType } from '../taskReducer';

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
    const [task, setTask] = useState<TaskType>({
        id: uuidv4(),
        value: '',
        done: false,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTask((prevState) => ({ ...prevState, value: e.target.value }));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.code === 'Enter') {
            e.preventDefault();
            dispatch({
                type: BoardActions.TASK_ADDED,
                columnId: columnItem.id,
                newTask: task,
            });
            setTask({ id: uuidv4(), value: '', done: false });
        }
    };

    const handleTaskSetDone = (id: string) => {
        dispatch({
            type: BoardActions.TASK_FINISHED,
            taskId: id,
            columnId: columnItem.id,
        });
    };

    return (
        <div
            className={
                'flex-shrink-0 flex flex-col justify-center items-center  border-2 rounded'
            }
        >
            <TitleComponent title={'My Title '} />
            <textarea
                placeholder={'Добавьте задачу!'}
                wrap={'soft'}
                className={'w-full p-2 border rounded break-words resize-none'}
                rows={1}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                value={task.value}
            />
            <div className={'flex flex-col justify-center items-center w-full'}>
                {columnItem.itemsList.map((item) => (
                    <TaskComponent
                        key={item.id}
                        task={item}
                        handleSetDone={() => handleTaskSetDone(item.id)}
                    />
                ))}
            </div>
        </div>
    );
};
