import PropTypes from "prop-types";

export const LeaderboardTable = ({ coins }) => {
  return (
    <table className="w-full text-left text-white">
      <thead>
        <tr className="bg-gray-800">
          <th className="p-3">Rank</th>
          <th className="p-3">Name</th>
          <th className="p-3">Price</th>
          <th className="p-3">24h Change</th>
          <th className="p-3">Market Cap</th>
        </tr>
      </thead>
      <tbody>
        {coins.map((coin, index) => (
          <tr key={coin.id} className="border-b border-gray-700">
            <td className="p-3">{index + 1}</td>
            <td className="p-3">{coin.name}</td>
            <td className="p-3">${coin.current_price?.toFixed(4) || "N/A"}</td>
            <td
              className={`p-3 ${
                coin.price_change_percentage_24h > 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {coin.price_change_percentage_24h?.toFixed(2) || "N/A"}%
            </td>
            <td className="p-3">${coin.market_cap?.toLocaleString() || "N/A"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

LeaderboardTable.propTypes = {
  coins: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired, // Adjusted to accept string IDs
      name: PropTypes.string.isRequired,
      current_price: PropTypes.number, // Optional
      price_change_percentage_24h: PropTypes.number, // Optional
      market_cap: PropTypes.number, // Optional
    })
  ).isRequired,
};
