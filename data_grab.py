import requests
from bs4 import BeautifulSoup
import pandas as pd

# Get names and addresses
data = pd.read_html("https://www.queensu.ca/facilities/accessibility/building-directory")[0]
images = []
no_image = []
text = []
for x in range(len(data)):
    url = "https://www.queensu.ca/encyclopedia" + "/" + str(data.iloc[x, 0][0]).lower() + "/" + str(
        data.iloc[x, 0]).lower().replace(" ", "-")
    req_response = requests.get(url)
    if req_response.status_code == 200:
        soup = BeautifulSoup(req_response.text, 'html.parser')
        text.append([i.text for i in soup.find_all('p')])
        z = 0
        for item in soup.find_all('img'):
            if str(item)[len(item) - 6:len(item) - 3] == "svg":
                continue
            out_str = (str("./public/images/buildings/"+data.iloc[x, 0])+"-"+str(z)+".jpg").lower().replace(" ","-")
            try:
                with open(out_str, 'wb') as handler:
                    handler.write(requests.get(("https://www.queensu.ca" + item['src'])).content)
                    images.append(str(data.iloc[x, 0]).lower().replace(" ", "-"))
            except:
                try:
                    with open(out_str, 'wb') as handler:
                        handler.write(requests.get(("https://www.queensu.ca" + item['data-src'])).content)
                        images.append(str(data.iloc[x, 0]).lower().replace(" ", "-"))
                except Exception as e:
                    print(item)
                    print(e)
            z += 1