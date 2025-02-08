import requests
import csv
import datetime

def fetch_stock_data(symbol, api_key):
    url = f"https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol={symbol}&outputsize=full&apikey={api_key}"
    response = requests.get(url)
    data = response.json()
    
    if "Time Series (Daily)" not in data:
        print("Error fetching data:", data)
        return None
    
    return data["Time Series (Daily)"]

def save_to_csv(data, symbol):
    filename = f"{symbol}_data_{datetime.datetime.now().strftime('%Y-%m-%d')}.csv"
    
    with open(filename, mode='w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(["Date", "Open", "High", "Low", "Close", "Volume"])
        
        for date, values in data.items():
            writer.writerow([date, values["1. open"], values["2. high"], values["3. low"], values["4. close"], values["5. volume"]])
    
    print(f"Data saved to {filename}")

def main():
    API_KEY = "B78G3U75VXNUVEDS"  # Replace with your API key
    SYMBOL = "BPCL.BSE"  # Replace with the desired stock symbol
    
    stock_data = fetch_stock_data(SYMBOL, API_KEY)
    if stock_data:
        save_to_csv(stock_data, SYMBOL)

if __name__ == "__main__":
    main()