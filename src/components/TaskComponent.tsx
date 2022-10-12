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
    return (
        <div
            className={`border rounded w-full pl-2 pr-4 py-2 flex justify-between items-start max-w-[234px] break-words gap-2 ${
                task.done && 'text-gray-400 line-through'
            }`}
            key={task.id}
        >
            <div>{task.value}</div>
            <div
                className={'self-end cursor-pointer'}
                onClick={() => handleSetDone(task.id)}
            >
                <CheckCircle size={18} />
            </div>
        </div>
    );
};
