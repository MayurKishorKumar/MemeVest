import PropTypes from "prop-types";

export const CoinCard = ({ coin }) => {
  return (
    <div className="bg-gray-700 p-4 rounded-lg shadow-md text-white">
      <h3 className="text-xl font-bold">{coin.name} ({coin.symbol?.toUpperCase()})</h3>
      <p className="mt-2 text-lg">
        Price: ${coin.current_price?.toFixed(4) || "N/A"}
      </p>
      <p className="text-sm mt-1">
        24h Change: {coin.price_change_percentage_24h?.toFixed(2) || "N/A"}%
      </p>
      <p className="text-sm mt-1">
        Market Cap: ${coin.market_cap?.toLocaleString() || "N/A"}
      </p>
    </div>
  );
};

CoinCard.propTypes = {
  coin: PropTypes.shape({
    name: PropTypes.string.isRequired,
    symbol: PropTypes.string.isRequired,
    current_price: PropTypes.number, // Adjusted to handle undefined
    price_change_percentage_24h: PropTypes.number, // Optional
    market_cap: PropTypes.number, // Optional
  }).isRequired,
};