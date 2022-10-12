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

    return (
        <ul className={'flex flex-col justify-center items-center w-full'}>
            {columnItem.itemsList.map((item) => (
                <TaskComponent
                    key={item.id}
                    task={item}
                    handleSetDone={() => handelTaskSetDone(item.id)}
                />
            ))}
        </ul>
    );
};
