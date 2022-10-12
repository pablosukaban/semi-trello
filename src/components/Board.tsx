import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

type TaskType = {
    id: string;
    value: string;
};

const Column = () => {
    const [task, setTask] = useState<TaskType>({ id: uuidv4(), value: '' });
    const [tasksArray, setTasksArray] = useState<TaskType[]>([]);

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTask((prevState) => ({ ...prevState, value: e.target.value }));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.code === 'Enter') {
            e.preventDefault();
            setTasksArray((prevState) => [...prevState, task]);
            setTask({ id: uuidv4(), value: '' });
        }
    };

    return (
        <div
            className={
                'flex flex-col justify-center items-center  border-2 rounded max-w-[220px] overflow-x-hidden '
            }
        >
            <h1>Title</h1>
            <textarea
                placeholder={'Добавьте задачу!'}
                wrap={'soft'}
                className={'w-full p-2 border rounded break-words resize-none'}
                rows={1}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                value={task.value}
            />
            <div
                className={
                    'flex flex-col justify-center items-center w-full overflow-y-auto'
                }
            >
                {tasksArray.map((item) => (
                    <div
                        className={
                            'border rounded w-full pl-2 pr-4 py-2 flex justify-between items-start '
                        }
                        key={item.id}
                    >
                        <div>{item.value}</div>
                        <div>but</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Board = () => {
    return (
        <div className={'flex justify-center items-start'}>
            <Column />
            <Column />
            <Column />
            <Column />
        </div>
    );
};

export default Board;
