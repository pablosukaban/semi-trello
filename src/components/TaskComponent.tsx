import React from 'react';
import { TaskType } from './Column';
import { CheckCircle } from 'phosphor-react';

export type TaskComponentProps = {
    task: TaskType;
    handleSetDone: (id: string) => void;
};

export const TaskComponent: React.FC<TaskComponentProps> = ({
    task,
    handleSetDone,
}) => {
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        handleSetDone(task.id);
    };

    return (
        <li
            className={`task border rounded w-full pl-2 pr-4 py-2 flex justify-between items-start max-w-[234px] break-words gap-2 cursor-grab `}
            draggable={true}
            key={task.id}
        >
            <div className={`${task.done && 'text-gray-400 line-through'}`}>
                {task.value}
            </div>
            <div className={'self-end cursor-pointer'} onClick={handleClick}>
                <CheckCircle size={18} />
            </div>
        </li>
    );
};
