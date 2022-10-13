import React, { useEffect, useRef, useState } from 'react';
import { BoardActions, BoardActionTypes } from '../taskReducer';

type TitleComponentProps = {
    title: string;
    columnId: string;
    dispatch: (action: BoardActionTypes) => void;
};

export const TitleComponent: React.FC<TitleComponentProps> = ({
    title,
    dispatch,
    columnId,
}) => {
    const [redactor, setRedactor] = useState('');
    const [visible, setVisible] = useState(false);

    const redactorRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!redactorRef.current) return;
        if (visible) {
            redactorRef.current.focus();
        }
    }, [visible]);

    const handleDoubleClick = () => {
        setVisible(true);
    };

    const handleRedactorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRedactor(e.target.value);
    };

    const handleRedactorSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter') {
            if (!redactor) return;
            dispatch({
                type: BoardActions.TITLE_CHANGED,
                title: redactor,
                columnId: columnId,
            });
            setVisible(false);
            setRedactor('');
        }
        if (e.code === 'Escape') {
            setRedactor('');
            setVisible(false);
        }
    };

    const handleRedactorBlur = () => {
        setRedactor('');
        setVisible(false);
    };

    return (
        <>
            {visible ? (
                <input
                    onBlur={handleRedactorBlur}
                    value={redactor}
                    onChange={handleRedactorChange}
                    className={'p-2 mb-0.5 leading-tight'}
                    placeholder={'Введите заголовок'}
                    onKeyDown={handleRedactorSubmit}
                    ref={redactorRef}
                />
            ) : (
                <h1
                    className={
                        'p-2 font-bold text-lg capitalize w-full leading-tight cursor-pointer'
                    }
                    onDoubleClick={handleDoubleClick}
                >
                    {title}
                </h1>
            )}
        </>
    );
};
