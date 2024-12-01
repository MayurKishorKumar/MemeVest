import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

// export const CoinCard = ({ coin }) => {
//   return (
//     <motion.div 
//       className="bg-gray-800 rounded-lg p-4"
//       whileHover={{ scale: 1.05 }}
//       whileTap={{ scale: 0.95 }}
//     >
//       <h3 className="text-xl font-bold mb-2">{coin.name} ({coin.symbol})</h3>
//       <p className="mb-1">Price: ${coin.price.toFixed(6)}</p>
//       <p className={`mb-1 ${coin.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
//         24h: {coin.change24h > 0 ? '+' : ''}{coin.change24h.toFixed(2)}%
//       </p>
//       <p className="mb-1">Moon Potential: {coin.moonPotential}%</p>
//     </motion.div>
//   );
// };

const CoinCard = ({ coin }) => {
  return (
    <div className="bg-white bg-opacity-20 rounded-lg p-4">
      <h3 className="text-lg font-bold">{coin.name} ({coin.symbol.toUpperCase()})</h3>
      <p>Price: ${coin.current_price.toFixed(4)}</p>
      <p>24h Change: {coin.price_change_percentage_24h.toFixed(2)}%</p>
      <p>Market Cap: ${coin.market_cap.toLocaleString()}</p>
    </div>
  );
};

export default CoinCard;


CoinCard.propTypes = {
  coin: PropTypes.shape({
    name: PropTypes.string.isRequired,
    symbol: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    change24h: PropTypes.number.isRequired,
    moonPotential: PropTypes.number.isRequired,
  }).isRequired,
};