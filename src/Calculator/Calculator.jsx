import React, { useEffect, useState } from 'react';
import './Calculator.css';

function Calculator() {
    const numbers = ['1','2','3','4','5','6','7','8','9','0'];
    const operators = ['+', '-', '*', '/', '(', ')'];
    const [selected, setSelected] = useState([]);
    const [result, setResult] = useState(0);
    const [activeKey, setActiveKey] = useState(null); // Track pressed key for highlighting

    useEffect(() => {
        const handleKeyDown = (event) => {
            const key = event.key;

            if (!isNaN(key) || operators.includes(key)) {
                handleClick(key);
            } else if (key === 'Enter') {
                handleResult();
            } else if (key === 'Backspace') {
                handleBackspace();
            } else if (key === 'C') {
                handleAc();
            }

            setActiveKey(key); // Highlight key
            setTimeout(() => setActiveKey(null), 200); // Remove highlight after 200ms
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [selected]);

    const handleClick = (num) => {
        if (operators.includes(num) && operators.includes(selected[selected.length - 1])) {
            return; // Prevent double operators
        }
        setSelected([...selected, num]);
    };

    const handleResult = () => {
        try {
            setResult(eval(selected.join(""))); // Evaluate expression
        } catch {
            alert("Invalid expression");
            setSelected([]);
            setResult(0);
        }
    };

    const handleAc = () => { 
        setSelected([]);
        setResult(0);
    };

    const handleBackspace = () => {
        setSelected(selected.slice(0, -1));
    };

    return (
        <div className='mainDiv'>
            <h1 className='title'>Calculator App</h1>
            <div className='calculate'>
                <div className='expression'>
                    <strong>{selected.join(" ")}</strong>
                </div>
                <div className='result'>
                    <strong>Result = {result}</strong>
                </div>
            </div>
            <div className='buttonGrid'>
                {numbers.map((num, index) => (
                    <button 
                        key={index} 
                        onClick={() => handleClick(num)}
                        className={`digits ${activeKey === num ? "active" : ""}`}
                    >
                        {num}
                    </button>
                ))}
                {operators.map((op, index) => (
                    <button 
                        key={index} 
                        onClick={() => handleClick(op)}
                        className={`digits operator ${activeKey === op ? "active" : ""}`}
                    >
                        {op}
                    </button>
                ))}
                <button onClick={handleResult} className={`digits equal ${activeKey === 'Enter' ? "active" : ""}`}>=</button>
                <button onClick={handleAc} className={`digits clear ${activeKey === 'Escape' ? "active" : ""}`}>AC</button>
                <button onClick={handleBackspace} className={`digits backspace ${activeKey === 'Backspace' ? "active" : ""}`}>⌫</button>
            </div>
        </div>
    );
}

export default Calculator;
