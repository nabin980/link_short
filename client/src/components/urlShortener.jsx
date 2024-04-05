import React, { useState } from 'react';
import axios from 'axios';
import './style.css'

const UrlShortener = () => {
    const [longUrl, setLongUrl] = useState('');
    const [shortenedUrl, setShortenedUrl] = useState('');
    const [qrCode, setQRCode] = useState('');
    const [showInput, setShowInput] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3005/shorten-url', { longUrl });
            setShortenedUrl(response.data.shortenedUrl);
            setQRCode(response.data.qrCode); 
            setLongUrl(''); 
            setShowInput(false); 
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleReset = () => {
        setShortenedUrl('');
        setQRCode('');
        setShowInput(true);
    };

    return (
        <div className='container'>
            <h1><span className="shorten">Shorten</span>  the url</h1>
            {showInput ? (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Paste the URL"
                        value={longUrl}
                        onChange={(e) => setLongUrl(e.target.value)}
                    />
                    <button type="submit">Shorten</button>
                </form>
            ) : (
                <input
                    type="text"
                    placeholder="Paste another URL"
                    value={longUrl}
                    onChange={(e) => setLongUrl(e.target.value)}
                    onBlur={() => setShowInput(true)} 
                />
            )}
            {shortenedUrl && (
                <div className='qr'>
                    <h3>Your <span className="shorten">URL</span>  has been <span className="shorten">shortened</span></h3>
                    <p><span className="shorten">Shortened URL:</span> <span className="color">{shortenedUrl}</span></p>
                    {qrCode && <img src={qrCode} alt="QR code" />} 
                </div>
            )}
        </div>
    );
};

export default UrlShortener;