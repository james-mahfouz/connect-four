import React, { useState } from 'react';
import { Slot } from './Slot';

const Board: React.FC = () => {
    const [board, setBoard] = useState<string[][]>(
        Array.from({ length:6 }, () => Array(7).fill(''))
    )
}