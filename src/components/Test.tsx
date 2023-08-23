'use client'

import { useState, useEffect } from 'react';
import styles from '@/styles/Test.module.css';

export default function Test() {
    const [boxColor, setBoxColor] = useState('blue');
    const [message, setMessage] = useState('Click to start!');
    const [startTime, setStartTime] = useState<number | null>(null);
    const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null); // 타이머 ID를 저장하기 위한 상태 추가

    const handleClick = () => {
        if (boxColor === 'blue') {
            setBoxColor('red');
            setMessage('Wait for green..');
            const id = setTimeout(() => {
                setBoxColor('green');
                setMessage('Now!');
                setStartTime(new Date().getTime());
            }, Math.random() * 3000 + 1000);
            setTimerId(id); // setTimeout의 반환값 (타이머 ID) 저장
        } else if (boxColor === 'green') {
            const endTime = new Date().getTime();
            if (startTime) {
                const reactionTime = endTime - startTime;
                setMessage(`Reaction time: ${reactionTime}ms`);
                setBoxColor('blue');
            }
        } else if (boxColor === 'red') {
            if (timerId) clearTimeout(timerId); // 빨간색 상태에서 클릭시 타이머 취소
            setBoxColor('blue');
            setMessage('Too soon!');
        }
    }

    return (
        <div id='test' className={styles.container}>
            <div className={styles.box + ' ' + styles[boxColor]} onClick={handleClick}>
                <span className={styles.message}>{message}</span>
            </div>
            <footer className={styles.footer}>
                &copy; 2023 Seungpyo. All rights reserved.
            </footer>
        </div>
    )
}
