'use client'

import React from 'react';
import styles from '@/styles/Leaderboard.module.css';

interface LeaderboardProps {
    results: { name: string; time: number }[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ results }) => {
    const sortedResults = results.sort((a, b) => a.time - b.time);

    return (
        <div id='leaderboard' className={styles.container}>
            <div id='leaderboard' className={styles.leaderboardContainer}>
                <h2 className={styles.leaderboardTitle}>Leaderboard</h2>
                <table className={styles.leaderboardTable}>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Time (ms)</th>
                    </tr>
                    </thead>
                    <tbody>
                    {sortedResults.map((result, index) => (
                        <tr key={index}>
                            <td>{result.name}</td>
                            <td>{result.time}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Leaderboard;
