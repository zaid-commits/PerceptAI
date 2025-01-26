import { useEffect } from 'react';

const KEEP_ALIVE_INTERVAL = 14 * 60 * 1000; // 14 minutes

const KeepAlive: React.FC = () => {
    useEffect(() => {
        const interval = setInterval(() => {
            fetch('http://localhost:5000/keep-alive')
                .then(response => response.text())
                .then(data => console.log('Keep-alive response:', data))
                .catch(error => console.error('Keep-alive error:', error));
        }, KEEP_ALIVE_INTERVAL);

        return () => clearInterval(interval);
    }, []);

    return null;
};

export default KeepAlive;