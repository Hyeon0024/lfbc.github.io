import React from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Research from './components/Research/Research';
import Papers from './components/Papers/Papers';
import Patents from './components/Patents/Patents';
import News from './components/News/News';
import Photos from './components/Photos/Photos';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Hero />
        <Research />
        <Papers />
        <Patents />
        <News />
        <Photos />
      </main>
      <Footer />
    </div>
  );
}

export default App;
