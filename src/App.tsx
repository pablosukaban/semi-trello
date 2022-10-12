import React from 'react';
import Board from './components/Board';

const App = () => {
    // TODO: Менять титл, завершать задачу, менять задачу, драгдроп
    return (
        <div className={'min-h-screen flex justify-center items-center'}>
            <Board />
        </div>
    );
};

export default App;
