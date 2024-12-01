import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SearchPage = () => {
  const navigate = useNavigate();
  const [cryptoData, setCryptoData] = useState(null);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [allCoins, setAllCoins] = useState([]);
  const [selectedCoins, setSelectedCoins] = useState([]);

  // Fetch the list of all supported coins on initial render
  useEffect(() => {
    const fetchAllCoins = async () => {
      try {
        const response = await fetch("https://api.coingecko.com/api/v3/coins/list");
        if (!response.ok) throw new Error("Failed to fetch coin list");
        const data = await response.json();
        setAllCoins(data);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchAllCoins();
  }, []);

  const handleSelectCoin = (coinId) => {
    if (!selectedCoins.includes(coinId)) {
      setSelectedCoins((prev) => [...prev, coinId]);
    }
  };

  const handleRemoveCoin = (coinId) => {
    setSelectedCoins((prev) => prev.filter((coin) => coin !== coinId));
  };

  const fetchCryptoData = async () => {
    setIsLoading(true);
    setError("");
    try {
      const results = await Promise.all(
        selectedCoins.map(async (coinId) => {
          const response = await fetch(
            `http://localhost:5000/api/price?ids=${coinId}&vs_currencies=usd`
          );
          if (!response.ok) throw new Error(`Failed to fetch data for ${coinId}`);
          return { coinId, data: await response.json() };
        })
      );

      const prices = results.map((result) => ({
        coinId: result.coinId,
        price: result.data[result.coinId]?.usd || "N/A",
      }));

      setCryptoData(prices);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredCoins = allCoins.filter((coin) =>
    coin.name.toLowerCase().startsWith(query.toLowerCase())
  );

  return (
    <div className="min-h-screen w-screen bg-gradient-to-b from-indigo-900 to-purple-800 flex justify-center items-center">
        {/* Back to Dashboard Button */}
      <button
        onClick={() => navigate("/")} // Navigate to the Dashboard
        className="absolute top-4 left-4 bg-gray-700 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-600"
      >
        ← Back to Dashboard
      </button>
      <div className="w-full max-w-3xl bg-gray-800 p-6 rounded-xl shadow-2xl">
        <h1 className="text-4xl font-extrabold text-center text-white mb-6 tracking-wider">
          Crypto Price Tracker
        </h1>
        <div className="bg-gray-700 rounded-lg p-4 shadow-inner">
          <input
            type="text"
            placeholder="Type to search for a coin"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-3 text-gray-800 rounded-lg mb-4 placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
          />
          {query && (
            <ul className="bg-gray-800 rounded-lg p-2 max-h-60 overflow-y-auto shadow-lg">
              {filteredCoins.slice(0, 10).map((coin) => (
                <li
                  key={coin.id}
                  onClick={() => handleSelectCoin(coin.id)}
                  className={`p-2 rounded cursor-pointer hover:bg-gray-600 ${
                    selectedCoins.includes(coin.id) ? "bg-gray-600" : "bg-gray-700"
                  } text-gray-300`}
                >
                  {coin.name} ({coin.symbol.toUpperCase()})
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-6">
          <h3 className="text-2xl font-semibold text-white mb-4">Selected Coins</h3>
          <ul className="space-y-3">
            {selectedCoins.map((coinId) => (
              <li
                key={coinId}
                className="bg-gray-800 p-3 rounded-lg flex justify-between items-center text-gray-300"
              >
                <span>{coinId}</span>
                <button
                  onClick={() => handleRemoveCoin(coinId)}
                  className="bg-red-600 px-3 py-1 rounded-lg hover:bg-red-700 text-white"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={fetchCryptoData}
            disabled={isLoading || selectedCoins.length === 0}
            className="bg-purple-600 px-6 py-2 rounded-lg text-white font-semibold hover:bg-purple-700 disabled:bg-gray-500"
          >
            {isLoading ? "Loading..." : "Fetch Prices"}
          </button>
        </div>

        {error && <p className="text-red-400 mt-4 text-center">{error}</p>}

        {cryptoData && (
          <div className="mt-6">
            <h3 className="text-2xl font-semibold text-white mb-4">Crypto Prices</h3>
            <ul className="space-y-2">
              {cryptoData.map((crypto) => (
                <li
                  key={crypto.coinId}
                  className="bg-gray-700 p-3 rounded-lg flex justify-between items-center text-gray-300"
                >
                  <span>{crypto.coinId.toUpperCase()}</span>
                  <span>${crypto.price}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
