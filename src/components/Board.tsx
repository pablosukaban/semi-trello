import React, { ChangeEvent, useState } from 'react';

const Column = () => {
    const [task, setTask] = useState('');
    const [tasksArray, setTasksArray] = useState<string[]>([
        'Задача 1',
        'Задача 2',
        'Задача 3',
        'Задача 4',
        'Задача 5',
    ]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTask(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter') {
            setTasksArray((prevState) => [...prevState, task]);
            setTask('');
        }
    };

    return (
        <div
            className={
                'flex flex-col justify-center items-center border-2 rounded '
            }
        >
            <h1>Title</h1>
            <input
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder={'Добавьте задачу!'}
                className={'w-full'}
                value={task}
            />
            <div
                className={
                    'flex flex-col justify-center items-center overflow-y-scroll w-full'
                }
            >
                {tasksArray.map((item) => (
                    <div key={item}>{item}</div>
                ))}
            </div>
        </div>
    );
};

const Board = () => {
    return (
        <div>
            <Column />
        </div>
    );
};

export default Board;
