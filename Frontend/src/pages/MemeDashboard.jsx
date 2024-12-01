import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { getRandomJoke } from '../utils/jokeUtils.js';
import { Header } from '../components/Header.jsx';
import { CoinCard } from '../components/CoinCard.jsx';
import { LeaderboardTable } from '../components/LeaderboardTable.jsx';

const MemeDashboard = () => {
  const navigate = useNavigate();
  const [memeCoins, setMemeCoins] = useState([]); // State for meme coins fetched from the API
  const [joke, setJoke] = useState(getRandomJoke());

  // Fetch coins from the CoinGecko API on component mount
  useEffect(() => {
    const fetchMemeCoins = async () => {
      try {
        const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd");
        if (!response.ok) throw new Error("Failed to fetch meme coins");
        const data = await response.json();

        // Filter only meme coins or specific coins (you can adjust this filter as needed)
        const memeCoins = data.filter((coin) =>
          ["dogecoin", "shiba-inu", "pepe", "floki"].includes(coin.id)
        );
        setMemeCoins(memeCoins);
      } catch (error) {
        console.error("Error fetching meme coins:", error.message);
      }
    };

    fetchMemeCoins();
  }, []);

  // Update the joke every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setJoke(getRandomJoke());
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-screen flex flex-col bg-gradient-to-b from-purple-600 to-blue-800 text-white p-8">
      <Header />

      <main className="flex-grow max-w-7xl mx-auto w-full px-8 py-8">
        <div className="flex justify-end mb-6">
          <button
            onClick={() => navigate('/search')}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg flex items-center gap-2 
                     transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <Search size={20} />
            <span>Search Memes</span>
          </button>
        </div>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Your Meme Portfolio</h2>
          <div className="bg-white bg-opacity-10 rounded-lg p-6">
            <p className="text-2xl mb-2">
              Total Value: $
              {memeCoins.reduce((total, coin) => total + coin.current_price, 0).toFixed(2)}
            </p>
            <p className="text-xl mb-4">Meme Worth Index: 🚀🚀🚀</p>
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
            <p className="text-xl mb-4">
              If DOGE hits $1, you&apos;ll have $
              {(memeCoins.find((coin) => coin.id === "dogecoin")?.current_price || 0 * 12345).toFixed(2)}
            </p>
            <p className="text-sm italic">Not financial advice—just pure, uncut hopium!</p>
          </div>
        </section>
      </main>

      <footer className="text-center py-4 text-sm">
        <p>© 2024 MemeVest. All rights reserved. No financial advice, just memes and dreams.</p>
      </footer>
    </div>
  );
};

export default MemeDashboard;