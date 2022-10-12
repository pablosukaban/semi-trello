import React, { useState, useRef, useEffect, ReactElement } from 'react';
import { TitleComponent } from './TitleComponent';
import { v4 as uuidv4 } from 'uuid';

type TaskType = {
    id: string;
    value: string;
};

const columnGenerator = () => {
    return { id: uuidv4(), element: <Column /> };
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
                        <div className={'self-end'}>but</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Board = () => {
    const [columnsArray, setColumnsArray] = useState<
        { id: string; element: ReactElement }[]
    >(() => {
        return new Array(5).fill(0).map((item) => columnGenerator());
    });

    const handleAddColumn = () => {
        setColumnsArray((prevState) => [...prevState, columnGenerator()]);
    };

    const handleRemoveColumn = () => {
        const withoutLast = columnsArray.filter(
            (item) => columnsArray.indexOf(item) !== columnsArray.length - 1
        );
        setColumnsArray(withoutLast)
    };

    return (
        <div className={'flex flex-col justify-center items-start'}>
            <button onClick={handleAddColumn}>Add</button>
            <button onClick={handleRemoveColumn}>Remove</button>
            <div className={'flex justify-center items-start'}>
                {columnsArray.map((item) => (
                    <React.Fragment key={item.id}>
                        {item.element}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default Board;
