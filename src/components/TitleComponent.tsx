import React, { useState, useEffect, useRef } from 'react';

export const TitleComponent = ({ title }: { title: string }) => {
    const [localTitle, setLocalTitle] = useState(title);
    // const [redactor, setRedactor] = useState<Redactor>({
    //     value: '',
    //     visible: false,
    // });
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
        // setRedactor((prevState) => ({ ...prevState, visible: true }));
        setVisible(true);
    };

    const handleRedactorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // setRedactor((prevState) => ({ ...prevState, value: e.target.value }));
        setRedactor(e.target.value);
    };

    const handleRedactorSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter') {
            // setLocalTitle(redactor.value);
            // setRedactor({ value: '', visible: false });
            setLocalTitle(redactor);
            setVisible(false);
            setRedactor('');
        }
        if (e.code === 'Escape') {
            setRedactor('');
            setVisible(false);
        }
    };

    return (
        <>
            {visible ? (
                <input
                    value={redactor}
                    onChange={handleRedactorChange}
                    className={'p-2 leading-tight'}
                    placeholder={'Введите заголовок'}
                    onKeyDown={handleRedactorSubmit}
                    ref={redactorRef}
                />
            ) : (
                <h1
                    className={
                        'p-2 font-bold text-lg capitalize w-full leading-tight'
                    }
                    onDoubleClick={handleDoubleClick}
                >
                    {localTitle}
                </h1>
            )}
        </>
    );
};
