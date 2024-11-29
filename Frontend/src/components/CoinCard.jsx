import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

export const CoinCard = ({ coin }) => {
  return (
    <motion.div 
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
  );
};

CoinCard.propTypes = {
  coin: PropTypes.shape({
    name: PropTypes.string.isRequired,
    symbol: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    change24h: PropTypes.number.isRequired,
    moonPotential: PropTypes.number.isRequired,
  }).isRequired,
};