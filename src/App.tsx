import React from 'react';
import Board from './components/Board';

const App = () => {
    // DONE: Менять титл, завершать задачу, добавлять/удалять столбцы
    // TODO: Поменять титл, Подробная инфа задачи, менять задачу, драгдроп, ограничить по ширине высоте, удалить конкретный столбец
    return (
        <div className={'max-w-[1000px] mx-auto '}>
            <div className={'min-h-screen flex justify-center items-center'}>
                <Board />
            </div>
        </div>
    );
};

export default App;
