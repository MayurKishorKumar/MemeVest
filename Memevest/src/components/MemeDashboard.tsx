import React, { useState, useEffect } from 'react';
import { MemeCoin, mockMemeCoins, formatNumber, getRandomJoke } from 'C:/GameAI/MemeVest/Memevest/src/utils/MemeUtils';
import { motion } from 'framer-motion';

const MemeDashboard: React.FC = () => {
  const [memeCoins, setMemeCoins] = useState<MemeCoin[]>(mockMemeCoins);
  const [joke, setJoke] = useState<string>(getRandomJoke());

  useEffect(() => {
    const interval = setInterval(() => {
      setJoke(getRandomJoke());
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-blue-800 text-white p-8">
      <header className="text-center mb-12">
        <motion.h1 
          className="text-6xl font-bold mb-4"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          MemeVest
        </motion.h1>
        <motion.p 
          className="text-2xl"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Where Memes Become Dreams
        </motion.p>
      </header>

      <main className="max-w-7xl mx-auto">
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Your Meme Portfolio</h2>
          <div className="bg-white bg-opacity-10 rounded-lg p-6">
            <p className="text-2xl mb-2">Total Value: $1,337.42</p>
            <p className="text-xl mb-4">Meme Worth Index: 69.420</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {memeCoins.map((coin) => (
                <motion.div 
                  key={coin.id} 
                  className="bg-gray-800 rounded-lg p-4"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <h3 className="text-xl font-bold mb-2">{coin.name} ({coin.symbol})</h3>
                  <p className="mb-1">Price: ${coin.price.toFixed(6)}</p>
                  <p className={`mb-1 ${coin.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    24h: {coin.change24h > 0 ? '+' : ''}{coin.change24h.toFixed(2)}%
                  </p>
                  <p className="mb-1">Moon Potential: {coin.moonPotential}%</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Meme Coin Leaderboard</h2>
          <div className="bg-white bg-opacity-10 rounded-lg p-6 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left">
                  <th className="pb-2">Coin</th>
                  <th className="pb-2">Price</th>
                  <th className="pb-2">24h Change</th>
                  <th className="pb-2">Market Cap</th>
                  <th className="pb-2">Volume</th>
                </tr>
              </thead>
              <tbody>
                {memeCoins.map((coin) => (
                  <tr key={coin.id} className="border-t border-gray-700">
                    <td className="py-2">
                      <div className="font-bold">{coin.name}</div>
                      <div className="text-sm text-gray-400">{coin.symbol}</div>
                    </td>
                    <td>${coin.price.toFixed(6)}</td>
                    <td className={coin.change24h >= 0 ? 'text-green-400' : 'text-red-400'}>
                      {coin.change24h > 0 ? '+' : ''}{coin.change24h.toFixed(2)}%
                    </td>
                    <td>${formatNumber(coin.marketCap)}</td>
                    <td>${formatNumber(coin.volume)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Meme of the Day</h2>
          <div className="bg-white bg-opacity-10 rounded-lg p-6 text-center">
            <p className="text-xl italic">"{joke}"</p>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">Dream Tracker</h2>
          <div className="bg-white bg-opacity-10 rounded-lg p-6">
            <p className="text-xl mb-4">If DOGE hits $1, you'll have $12,345.67</p>
            <p className="text-sm italic">Not financial advice—just pure, uncut hopium!</p>
          </div>
        </section>
      </main>

      <footer className="text-center mt-12 text-sm">
        <p>© 2023 MemeVest. All rights reserved. No financial advice, just memes and dreams.</p>
      </footer>
    </div>
  );
};

export default MemeDashboard;