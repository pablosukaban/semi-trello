import React from 'react';

type InputComponentProps = {
    value: string;
    handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
};

export const InputComponent: React.FC<InputComponentProps> = ({
    value,
    handleInputChange,
    handleKeyDown,

}) => {

    return (
        <textarea
            placeholder={'Добавьте задачу!'}
            wrap={'soft'}
            className={'w-full p-2 border rounded break-words resize-none'}
            rows={1}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            value={value}
        />
    );
};
