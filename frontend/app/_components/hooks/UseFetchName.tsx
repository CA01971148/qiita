import { useEffect, useState } from 'react';

const UseFetchName = () => {
    const [name, setName] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [id,setId] = useState<number>();

    useEffect(() => {
        const fetchName = async () => {
            try {
                const response = await fetch('http://localhost:5000/confirmation_name', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                if (data.error) {
                    setError(data.error);
                } else {
                    setName(data.name);
                    setId(data.id)
                }
            } catch (error) { 
                setError('処理がうまくいきませんでした'); 
            }
            };

        fetchName();
    }, []);

    return { name, error ,id };
};

export default UseFetchName;
