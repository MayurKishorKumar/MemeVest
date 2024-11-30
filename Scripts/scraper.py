import os
import requests
import pandas as pd
from datetime import datetime, timedelta
from dotenv import load_dotenv

# Load API key from .env file
load_dotenv()
API_KEY = os.getenv('COINMARKETCAP_API_KEY')

if not API_KEY:
    raise ValueError("API key not found. Please add it to the .env file.")

# Base URL for the CoinMarketCap API
BASE_URL = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/ohlcv/historical'

# Function to fetch historical data for a cryptocurrency
def fetch_historical_data(symbol, start_date, end_date):
    headers = {
        'Accepts': 'application/json',
        'X-CMC_PRO_API_KEY': API_KEY,
    }
    params = {
        'symbol': symbol,
        'time_start': start_date,
        'time_end': end_date,
        'interval': 'daily'
    }

    response = requests.get(BASE_URL, headers=headers, params=params)
    
    if response.status_code == 200:
        data = response.json()
        return data['data']['quotes']
    else:
        print(f"Error: {response.status_code} - {response.json()}")
        return None

# Set start and end dates
end_date = datetime.now()
start_date = end_date - timedelta(days=365)

# Format dates for API
start_date_str = start_date.strftime('%Y-%m-%d')
end_date_str = end_date.strftime('%Y-%m-%d')

# Cryptocurrency symbol (e.g., 'DOGE; for Dogecoin)
crypto_symbol = 'DOGE'

# Fetch data
historical_data = fetch_historical_data(crypto_symbol, start_date_str, end_date_str)

# Convert to DataFrame
if historical_data:
    df = pd.DataFrame(historical_data)
    # Convert timestamps to readable date format
    df['timestamp'] = pd.to_datetime(df['time_open']).dt.date
    # Reorder columns
    df = df[['timestamp', 'open', 'high', 'low', 'close', 'volume']]
    # Save to CSV
    df.to_csv(f'{crypto_symbol}_historical_data.csv', index=False)
    print(f"Data saved to {crypto_symbol}_historical_data.csv")
else:
    print("No data fetched.")
