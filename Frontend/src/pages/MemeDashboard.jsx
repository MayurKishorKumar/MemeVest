import { useState, useEffect } from 'react';
import { mockMemeCoins } from '../utils/memeUtils.js';
import { getRandomJoke } from '../utils/jokeUtils.js';
import { Header } from '../components/Header.jsx';
import { CoinCard } from '../components/CoinCard.jsx';
import { LeaderboardTable } from '../components/LeaderboardTable.jsx';
import { fetchMemeCoins } from '../utils/apiUtils.js';

const MemeDashboard = () => {
  const [memeCoins, setMemeCoins] = useState(mockMemeCoins);
  const [joke, setJoke] = useState(getRandomJoke());

  useEffect(() => {
    const loadMemeCoins = async () => {
      const coins = await fetchMemeCoins();
      setMemeCoins(coins);
    };
    loadMemeCoins();

    const interval = setInterval(() => {
      setJoke(getRandomJoke());
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-blue-800 text-white p-8">
      <Header />

      <main className="max-w-7xl mx-auto">
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Your Meme Portfolio</h2>
          <div className="bg-white bg-opacity-10 rounded-lg p-6">
            <p className="text-2xl mb-2">Total Value: $1,337.42</p>
            <p className="text-xl mb-4">Meme Worth Index: 69.420</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {memeCoins.map((coin) => (
                <CoinCard key={coin.id} coin={coin} />
              ))}
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Meme Coin Leaderboard</h2>
          <div className="bg-white bg-opacity-10 rounded-lg p-6 overflow-x-auto">
            <LeaderboardTable coins={memeCoins} />
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Meme of the Day</h2>
          <div className="bg-white bg-opacity-10 rounded-lg p-6 text-center">
            <p className="text-xl italic">&quot;{joke}&quot;</p>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-4">Dream Tracker</h2>
          <div className="bg-white bg-opacity-10 rounded-lg p-6">
            <p className="text-xl mb-4">If DOGE hits $1, you&apos;ll have $12,345.67</p>
            <p className="text-sm italic">Not financial advice—just pure, uncut hopium!</p>
          </div>
        </section>
      </main>

      <footer className="text-center mt-12 text-sm">
        <p>© 2024 MemeVest. All rights reserved. No financial advice, just memes and dreams.</p>
      </footer>
    </div>
  );
};

export default MemeDashboard;