import React, { useRef, useEffect, useState } from 'react';

function PaintCanvas() {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [color, setColor] = useState('#000000');
    const [brushSize, setBrushSize] = useState(5);

    // Set canvas size to window size
    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth * 0.8;
        canvas.height = window.innerHeight * 0.8;
        canvas.style.width = `${window.innerWidth * .8}px`;
        canvas.style.height = `${window.innerHeight * 0.8}px`;

        const context = canvas.getContext('2d');
        context.lineCap = 'round';
        contextRef.current = context;
    }, []);

    // Update canvas context properties when color or brush size changes
    useEffect(() => {
        if (contextRef.current) {
            contextRef.current.strokeStyle = color;
            contextRef.current.lineWidth = brushSize;
        }
    }, [color, brushSize]);

    const startDrawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
        setIsDrawing(true);
    };

    const draw = ({ nativeEvent }) => {
        if (!isDrawing) return;
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
    };

    const stopDrawing = () => {
        contextRef.current.closePath();
        setIsDrawing(false);
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
    };

    return (
        <div>
            <canvas
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                ref={canvasRef}
            />
            <div className="controls">
                <input type="color" value={color} onChange={e => setColor(e.target.value)} />
                <input type="range" min="1" max="20" value={brushSize} onChange={e => setBrushSize(e.target.value)} />
                <button onClick={() => setColor('#ffffff')}>Erase</button>
                <button onClick={clearCanvas}>Clear</button>
            </div>
        </div>
    );
}

export default PaintCanvas;
