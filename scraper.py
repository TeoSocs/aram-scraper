from bs4 import BeautifulSoup
import requests

BASE_URL = 'https://www.metasrc.com'

page_link = BASE_URL + '/aram/tierlist'

page_response = requests.get(page_link, timeout=5)
page_content = BeautifulSoup(page_response.content, "html.parser")

# print(page_content)

print(page_content.find_all(class_="champion-grid-item"))

for champion in page_content.find_all(".champion-grid-item"):
  i = 0
