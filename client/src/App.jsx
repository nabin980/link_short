// src/App.js
import React from 'react';
import UrlShortener from './components/urlShortener';
import Background from './components/Background';

function App() {
    return (
        <div className="App">
            
            <UrlShortener/>
            <Background />
        </div>
    );
}

export default App;
