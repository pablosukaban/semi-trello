import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TitleComponent } from './TitleComponent';
import { TaskComponent } from './TaskComponent';

export type TaskType = {
    id: string;
    value: string;
    done: boolean;
};

export const Column = () => {
    const [task, setTask] = useState<TaskType>({
        id: uuidv4(),
        value: '',
        done: false,
    });
    const [tasksArray, setTasksArray] = useState<TaskType[]>([]);

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTask((prevState) => ({ ...prevState, value: e.target.value }));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.code === 'Enter') {
            e.preventDefault();
            setTasksArray((prevState) => [...prevState, task]);
            setTask({ id: uuidv4(), value: '', done: false });
        }
    };

    const handleTaskSetDone = (id: string) => {
        console.log(id);
        const changedArray = tasksArray.map((item) => {
            if (item.id !== id) return item;
            return { ...item, done: !item.done };
        });
        setTasksArray(changedArray);
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
                {tasksArray.map((item) => (
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
