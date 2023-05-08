import json
import os
import re
import pandas as pd
import requests
import pymysql
from bs4 import BeautifulSoup

# Get names and addresses
acc_url = "https://www.queensu.ca/facilities/accessibility/building-directory"
data = pd.read_html(acc_url)[0]

# Get the link table. Pandas doesn't preserve hyperlinks.
sp_acc = BeautifulSoup(requests.get(acc_url).text, 'html.parser')
link_table = \
    [
        [
            [
                item['href'] for item in td.find_all('a')
            ]
            for td in tr.find_all('td')
        ]
        for tr in sp_acc.find_all('table')[0].find_all('tr')
    ]

for x in range(len(data)):
    # Generate Tag (there are many inconsistent tags that were accounted for).
    d_name = str(data.iloc[x, 0]).lower().replace(" ", "-")
    match d_name:
        case "the-university-club":
            d_name = "university-club-queens"
        case "the-law-building":
            d_name = "law-building"
        case "school-of-kinesiology-and-health-studies":
            d_name = "kinesiology-and-health-studies-school"
        case "richardson-lab":
            d_name = "richardson-laboratory"
        case "richardson-stadium":
            d_name = "george-richardson-memorial-stadium"
        case "queen's-centre-/-athletics-and-recreation-centre-(arc)":
            d_name = "athletics-and-recreation-centre-arc"
        case "new-medical-building":
            d_name = "school-medicine-building"
        case "louise-d.-acton-building":
            d_name = "louise-d-acton-building"
        case "joseph-s.-stauffer-library":
            d_name = "stauffer-library"
        case "john-watson-hall":
            d_name = "watson-hall"
        case "isabel-bader-centre-for-performing-arts":
            d_name = "isabel-bader-centre-performing-arts"
        case "harrison-le-caine-hall":
            d_name = "harrison-lecaine-hall"
        case "the-grad-club":
            d_name = "grad-club"
        case "four-directions-indigenous-student-centre":
            d_name = "four-directions"
        case "flemming-hall---stewart-pollock-wing":
            d_name = "fleming-hall"
        case "flemming-hall:-jemmet-wing":
            d_name = "fleming-hall"
        case "donald-gordon-centre":
            d_name = "donald-gordon-conference-centre"
        case "chernoff-hall-&-auditorium":
            d_name = "chernoff-hall"
        case "biosciences-complex-&-earl-hall":
            d_name = "biosciences-complex"
        case "asus-offices":
            d_name = "arts-and-science-undergraduate-society-asus"
        case "office-of-advancement,-faculty-of-health-sciences-building":
            d_name = "health-sciences-faculty"
        case "environmental-health-&-safety-building":
            d_name = "ehs-building"
        case "bruce-wing":
            d_name = "miller-hall"
        case "78-barrie-street":
            d_name = "administrative-offices"
        case "macklem-house":
            d_name = "katherine-bermingham-macklem-house"
        case "184-union-st":
            d_name = "queens_daycare"
        case "186-barrie-st":
            d_name = "186-barrie-street"

    # Get expected encyclopedia entry.
    url = "https://www.queensu.ca/encyclopedia" + "/" + d_name[0] + "/" + d_name

    # The one building where it's entry doesn't start with its alphabetical beginning.
    if d_name == "katherine-bermingham-macklem-house":
        url = "https://www.queensu.ca/encyclopedia/m/katherine-bermingham-macklem-house"
    req_response = requests.get(url)
    z = 0
    text = ""
    images = []
    alts = []

    # If the expected entry exists.
    if req_response.status_code == 200:
        soup = BeautifulSoup(req_response.text, 'html.parser')
        text = [i.text for i in soup.find_all('article')[0].find_all('p')]
        # Get all images in the page.
        for item in soup.find_all('img'):
            # Ignore SVGs (menu icons, queen's logo, etc.)
            if str(item)[len(item) - 6:len(item) - 3] != "svg":
                out_str = str("./public/images/buildings/" + d_name + "-" + str(z) + ".jpg")
                try:
                    # Try to write the image to local storage.
                    with open(out_str, 'wb') as handler:
                        handler.write(requests.get(("https://www.queensu.ca" + item['src'])).content)
                        images.append(out_str)
                        # Get the alt text (wouldn't be much of an accessibility app if visually-impaired can't use it)
                        alts.append(item['alt'])
                except:
                    try:
                        # Accounting for some WebPublish 2 legacy formatting.
                        with open(out_str, 'wb') as handler:
                            handler.write(requests.get(("https://www.queensu.ca" + item['data-src'])).content)
                            images.append(out_str)
                            alts.append(item['alt'])
                    except Exception as e:
                        print(e)
                z += 1
        if z == 0:
            # If no images found, use one of the ones I downloaded manually.
            images.append("./public/images/buildings/" + d_name + ".jpg")
    else:
        print(url)

    # Get accessibility description
    sp_2 = BeautifulSoup(requests.get("https://www.queensu.ca" + link_table[x + 1][0][0]).text, 'html.parser')
    acc_des = [i.text for i in sp_2.find_all('article')[0].find_all('p')]

    # Convert shortened Google Maps links to long-form.
    shorturl = link_table[x + 1][4][len(link_table[x + 1][4]) - 1]
    session = requests.Session()
    resp = session.head(shorturl, allow_redirects=True)
    longurl = resp.url
    if(d_name == 'chernoff-hall'):
        longurl = "https://www.google.ca/maps/place//@44.2246547,-76.4993621,18z"
    # Get Coordinates From Google Maps
    temp = longurl.split('/')[6].replace('@','').split(',')
    lat = float(temp[0])
    long = float(temp[1]) + .0021

    dictionary = {
        "name": str(data.iloc[x, 0]),
        "coords": [lat, long],
        "addr": str(data.iloc[x, 1]),
        "images": images,
        "alts": alts,
        "desc": text,
        "desc_src": url,
        "access": acc_des,
        "map": shorturl
    }

    with open(str("./buildings/" + d_name + ".json"), "w") as outfile:
        json.dump(dictionary, outfile)
