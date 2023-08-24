'use client'

import React, {useEffect, useState} from 'react';
import styles from '@/styles/Test.module.css';

interface TestProps {
    onNewResult: (result: {name: string, time: number}) => void;
}

export default function Test({ onNewResult }: TestProps) {
    const [boxColor, setBoxColor] = useState('blue');
    const [message, setMessage] = useState('Click to start!');
    const [startTime, setStartTime] = useState<number | null>(null);
    const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
    const [name, setName] = useState('');

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'Enter') {
                handleClick();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [boxColor, startTime, timerId]);

    const handleClick = () => {
        if (!name.trim()) { // 이름이 비어있는지 확인
            setMessage('Please enter your name first!');
            return;
        }

        if (boxColor === 'blue') {
            setBoxColor('red');
            setMessage('Wait for green..');
            const id = setTimeout(() => {
                setBoxColor('green');
                setMessage('Now!');
                setStartTime(new Date().getTime());
            }, Math.random() * 3000 + 1000);
            setTimerId(id);
        } else if (boxColor === 'green') {
            const endTime = new Date().getTime();
            if (startTime) {
                const reactionTime = endTime - startTime;
                setMessage(`Reaction time: ${reactionTime}ms`);
                setBoxColor('blue');
                onNewResult({name: name, time: reactionTime});
            }
        } else if (boxColor === 'red') {
            if (timerId) clearTimeout(timerId);
            setBoxColor('blue');
            setMessage('Too soon!');
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.nameInputContainer}>
                <input
                    type="text"
                    id={styles.name}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                />
            </div>
            <div className={styles.box + ' ' + styles[boxColor]} onClick={handleClick}>
                <span className={styles.message}>{message}</span>
            </div>
        </div>
    )
}
