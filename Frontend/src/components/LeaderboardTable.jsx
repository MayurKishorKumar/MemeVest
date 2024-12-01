import PropTypes from 'prop-types';

const formatNumber = (num) => {
  if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
  if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
  if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
  return num.toString();
};

export const LeaderboardTable = ({ coins }) => {
  return (
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
        {coins.map((coin) => (
          <tr key={coin.id} className="border-t border-white border-opacity-10">
            <td className="py-2">
              <div className="font-bold">{coin.name}</div>
              <div className="text-sm text-gray-300">{coin.symbol}</div>
            </td>
            <td>${coin.price.toFixed(8)}</td>
            <td className={coin.change24h >= 0 ? 'text-green-400' : 'text-red-400'}>
              {coin.change24h > 0 ? '+' : ''}{coin.change24h.toFixed(2)}%
            </td>
            <td>${formatNumber(coin.marketCap)}</td>
            <td>${formatNumber(coin.volume)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

LeaderboardTable.propTypes = {
  coins: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    symbol: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    change24h: PropTypes.number.isRequired,
    marketCap: PropTypes.number.isRequired,
    volume: PropTypes.number.isRequired
  })).isRequired
};