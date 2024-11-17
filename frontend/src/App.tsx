import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const App: React.FC = () => {
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/hello/')
            .then(response => response.json())
            .then(data => setMessage(data.message));
    }, []);

    return (
        <div>
            <Typography variant="h1">{message}</Typography>
            <Button variant="contained" color="primary">
                Hello World
            </Button>
        </div>
    );
};

export default App;