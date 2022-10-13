import React, { useState } from 'react';
import { BoardActions, BoardActionTypes, ColumnType } from '../taskReducer';
import { TaskComponent } from './TaskComponent';
import { TaskType } from './Column';

type TaskListComponentProps = {
    columnArray: ColumnType[];
    columnItem: ColumnType;
    dispatch: (action: BoardActionTypes) => void;
};

export const TaskListComponent: React.FC<TaskListComponentProps> = ({
    columnItem,
    dispatch,
}) => {
    // Баг: только со второго драгдропа оживает, из-за того что по умолчанию текущие null
    const [currentColumn, setCurrentColumn] = useState<ColumnType | null>(
        columnItem
    );
    const [currentTask, setCurrentTask] = useState<TaskType | null>(
        columnItem.itemsList[0]
    );

    const handleClick = (task: TaskType, column: ColumnType) => {
        setCurrentColumn(column);
        setCurrentTask(task);
    };

    const handelTaskSetDone = (id: string) => {
        dispatch({
            type: BoardActions.TASK_FINISHED,
            columnId: columnItem.id,
            taskId: id,
        });
    };

    const handleDragStart = (task: TaskType, column: ColumnType) => {
        console.log('task from drag start', task);
        console.log('column from drag start', column);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        const element = e.target as HTMLElement;
        element.style.boxShadow = '0 2px 2px gray';
    };

    const handleDragLeave = (e: React.DragEvent) => {
        const element = e.target as HTMLElement;
        element.style.boxShadow = 'none';
    };

    const handleDragEnd = (e: React.DragEvent) => {
        const element = e.target as HTMLElement;
        element.style.boxShadow = 'none';
    };

    const handleDrop = (
        e: React.DragEvent,
        column: ColumnType,
        task: TaskType
    ) => {
        e.preventDefault();

        const element = e.target as HTMLElement;
        element.style.boxShadow = 'none';

        if (!currentTask || !currentColumn) return;
        dispatch({
            type: BoardActions.DRAG_DROP,
            taskId: task.id,
            columnId: column.id,
            currentColumn: currentColumn,
            currentTask: currentTask,
            task: task,
            column: column,
        });
    };

    return (
        <ul className={'flex flex-col justify-center items-center w-full'}>
            {columnItem.itemsList.map((singleTask) => (
                <TaskComponent
                    columnItem={columnItem}
                    key={singleTask.id}
                    task={singleTask}
                    handleDragOver={handleDragOver}
                    handleSetDone={() => handelTaskSetDone(singleTask.id)}
                    handleDragLeave={handleDragLeave}
                    handleDragEnd={handleDragEnd}
                    handleDrop={handleDrop}
                    handleDragStart={handleDragStart}
                    handleClick={handleClick}
                />
            ))}
        </ul>
    );
};
