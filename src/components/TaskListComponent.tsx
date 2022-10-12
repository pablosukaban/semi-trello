import React from 'react';
import { BoardActions, BoardActionTypes, BoardType } from '../taskReducer';
import { TaskComponent } from './TaskComponent';

type TaskListComponentProps = {
    columnItem: BoardType;
    dispatch: (action: BoardActionTypes) => void;
};

export const TaskListComponent: React.FC<TaskListComponentProps> = ({
    columnItem,
    dispatch,
}) => {
    const handelTaskSetDone = (id: string) => {
        dispatch({
            type: BoardActions.TASK_FINISHED,
            columnId: columnItem.id,
            taskId: id,
        });
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        const element = e.target as HTMLElement;
        if (element.tagName.toLowerCase() === 'li') {
            console.log('li');
            element.style.boxShadow = '0 2px 3px gray';
        }
    };

    const handleDragLeave = (e: React.DragEvent) => {
        const element = e.target as HTMLElement;
        element.style.boxShadow = 'none';
    };

    const handleDragEnd = (e: React.DragEvent) => {
        const element = e.target as HTMLElement;
        element.style.boxShadow = 'none';
    };

    const handleDrop = (e: React.DragEvent) => {
        const element = e.target as HTMLElement;
        element.style.boxShadow = 'none';
    };

    return (
        <ul className={'flex flex-col justify-center items-center w-full'}>
            {columnItem.itemsList.map((item) => (
                <TaskComponent
                    key={item.id}
                    task={item}
                    handleDragOver={handleDragOver}
                    handleSetDone={() => handelTaskSetDone(item.id)}
                    handleDragLeave={handleDragLeave}
                    handleDragEnd={handleDragEnd}
                    handleDrop={handleDrop}
                />
            ))}
        </ul>
    );
};
