import PropTypes from 'prop-types';

export const CoinCard = ({ coin }) => {
  return (
    <div className="bg-white bg-opacity-10 rounded-lg p-4 hover:bg-opacity-20 transition-all duration-200">
      <h3 className="text-xl font-bold mb-2">{coin.name} ({coin.symbol})</h3>
      <p className="mb-1">Price: ${coin.price.toFixed(8)}</p>
      <p className={`mb-1 ${coin.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
        24h: {coin.change24h > 0 ? '+' : ''}{coin.change24h.toFixed(2)}%
      </p>
      <p className="mb-1">Moon Potential: {coin.moonPotential}%</p>
    </div>
  );
};

CoinCard.propTypes = {
  coin: PropTypes.shape({
    name: PropTypes.string.isRequired,
    symbol: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    change24h: PropTypes.number.isRequired,
    moonPotential: PropTypes.number.isRequired
  }).isRequired
};