import { Search } from 'lucide-react';
import PropTypes from 'prop-types';

export const SearchBar = ({ onSearch, searchQuery, setSearchQuery }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-2xl">
      <div className="relative flex-1">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for memes..."
          className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-10 border border-white border-opacity-20 
                   text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      <button
        type="submit"
        className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg flex items-center gap-2 
                 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        <Search size={20} />
        <span>Search</span>
      </button>
    </form>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
};