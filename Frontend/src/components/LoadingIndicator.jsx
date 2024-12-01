import PropTypes from 'prop-types';

export const LoadingIndicator = ({ message }) => {
  return (
    <div className="animate-pulse">
      <p className="text-xl">{message}</p>
    </div>
  );
};

LoadingIndicator.propTypes = {
  message: PropTypes.string.isRequired,
};