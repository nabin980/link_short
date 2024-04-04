import React, { useState } from 'react';
import axios from 'axios';
import './style.css';

const UrlShortener = () => {
    const [longUrl, setLongUrl] = useState('');
    const [shortenedUrl, setShortenedUrl] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3005/shorten-url', { longUrl });
            console.log(response)
            setShortenedUrl(response.data.shortenedUrl);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    return (
        <div className='container'>
            <h1>URL Shortener</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter URL"
                    value={longUrl}
                    onChange={(e) => setLongUrl(e.target.value)}
                />
                <button type="submit">Shorten</button>
            </form>
            {shortenedUrl && <p>Shortened URL: {shortenedUrl}</p>}
        </div>
    );
};

export default UrlShortener;
