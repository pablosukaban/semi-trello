import React from 'react';
import { TaskType } from './Column';
import { CheckCircle } from 'phosphor-react';
import { ColumnType } from '../taskReducer';

export type TaskComponentProps = {
    task: TaskType;
    columnItem: ColumnType;
    handleSetDone: (id: string) => void;
    handleDragOver: (e: React.DragEvent) => void;
    handleDragEnd: (e: React.DragEvent) => void;
    handleDragLeave: (e: React.DragEvent) => void;
    handleDrop: (
        e: React.DragEvent,
        column: ColumnType,
        task: TaskType
    ) => void;
    handleDragStart: (task: TaskType, board: ColumnType) => void;
    handleClick: (task: TaskType, board: ColumnType) => void;
};

export const TaskComponent: React.FC<TaskComponentProps> = ({
    task,
    columnItem,
    handleSetDone,
    handleDragOver,
    handleDragEnd,
    handleDragLeave,
    handleDrop,
    handleDragStart,
    handleClick,
}) => {
    const handleSelectClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        handleSetDone(task.id);
    };

    return (
        <li
            className={`border rounded w-full pl-2 pr-4 py-2 flex justify-between items-start max-w-[234px] break-words gap-2 cursor-grab `}
            key={task.id}
            draggable={true}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            onDragLeave={handleDragLeave}
            onDrop={(e: React.DragEvent) => handleDrop(e, columnItem, task)}
            onDragStart={() => handleDragStart(task, columnItem)}
            onPointerDown={() => handleClick(task, columnItem)}
        >
            <div
                className={`${
                    task.done && 'text-gray-400 line-through'
                } w-full pointer-events-none`}
            >
                {task.value}
            </div>
            <div
                className={'self-end cursor-pointer'}
                onClick={handleSelectClick}
            >
                <CheckCircle size={18} />
            </div>
        </li>
    );
};
