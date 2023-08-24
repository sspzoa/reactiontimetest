// @app/page.tsx

'use client'

import React, { useState } from 'react';
import Test from "@/components/Test";
import Leaderboard from '../components/Leaderboard';
import Footer from "@/components/Footer";

export default function Home() {
    const [results, setResults] = useState<{name: string, time: number}[]>([]);

    return (
        <div className="container">
            <Test onNewResult={(result) => setResults(prev => [...prev, result])}/>
            <Leaderboard results={results} />
            <Footer />
        </div>
    )
}
