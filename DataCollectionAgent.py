#Data Collection AI Agent


import requests


url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=B78G3U75VXNUVEDS'
r = requests.get(url)
data = r.json()

print(data)