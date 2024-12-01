import yfinance as yf
import pandas as pd

def fetch_crypto_data(tickers, start_date, end_date):
    """
    Fetch historical closing price and daily percent change for specified cryptocurrencies.
    
    Parameters:
        tickers (list): List of cryptocurrency tickers (e.g., ['BTC', 'ETH']).
        start_date (str): Start date for fetching data (format: 'YYYY-MM-DD').
        end_date (str): End date for fetching data (format: 'YYYY-MM-DD').
    
    Returns:
        tuple: A tuple containing:
            - Historical adjusted close price DataFrame.
            - Daily returns DataFrame.
    """
    # Append '-USD' for historical data
    modified_tickers = [f"{ticker}-USD" for ticker in tickers]
    
    # Download historical price data
    df = yf.download(
        modified_tickers, 
        start=start_date, 
        end=end_date
    )['Adj Close']
    
    # Rename columns to original ticker names
    df.columns = tickers
    df = df.fillna(method='ffill').dropna()  # Handle missing data
    
    # Calculate daily returns
    returns = df.pct_change().dropna()
    
    return df, returns