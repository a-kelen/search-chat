import requests
from utils.search_response import SearchResponse
from utils.config import GOOGLEAPIS_URL, GOOGLEAPIS_TOKEN, GOOGLEAPIS_CX

def get_result(message: str):
    params = {
        "q": message,
        "key": GOOGLEAPIS_TOKEN,
        "cx": GOOGLEAPIS_CX
    }

    response = requests.get(GOOGLEAPIS_URL, params=params)
    results = response.json()
    items = results['items']
    if (len(items) == 0):
        return None
    else:
        first_item = items[0]
        return SearchResponse(title=first_item['title'], message=first_item['snippet'])
