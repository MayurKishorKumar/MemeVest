import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { SearchBar } from '../components/SearchBar';
import { LoadingIndicator } from '../components/LoadingIndicator';
import { PageHeader } from '../components/PageHeader';
import { useSearch } from '../hooks/useSearch';

const SearchPage = () => {
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery, isSearching, handleSearch } = useSearch();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-start mb-6">
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 text-white hover:bg-white/10 rounded-lg flex items-center gap-2 
                     transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <ArrowLeft size={20} />
            <span>Back to Dashboard</span>
          </button>
        </div>

        <PageHeader 
          title="Search Memes" 
          subtitle="Discover the dankest memes in the cryptoverse" 
        />

        <div className="flex justify-center mb-8">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSearch={handleSearch}
          />
        </div>

        <div className="text-center">
          {isSearching && <LoadingIndicator message="Searching..." />}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;