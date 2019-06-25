import re
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
# from selenium.webdriver.firefox.options import Options
from selenium.webdriver.common.by import By
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.touch_actions import TouchActions
from selenium.common.exceptions import TimeoutException
import os
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys

def get_product_info(id):
    url = 'https://www.amazon.com/dp/' + id
    # Get the product information

    # # setup variables for the app to aquire

    # Could also include the subcategories of the product
    categories = []


    top_category = ""

    # Should be broken down into smaller variables of L, W, H
    dimensions = ""
    weight = 0

    # Many ranks for one product
    ranks = []

    # Start the headless chrome browser
    print("Starting headless chrome browser...")
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    browser = webdriver.Chrome(chrome_options=chrome_options)
    print("Chrome started")

    # Get the url of the Amazon product page using the headless browser
    print("Retrieving product information...")
    browser.get(url)
    # wait for browser to load the webpage
    time.sleep(5)

    # # Find and store all the needed peramiters based on ids and classes

    # Category

    breadcrumbs = browser.find_elements_by_id('wayfinding-breadcrumbs_feature_div')[0]

    # Get every second element because between then are ">"
    category_elements = breadcrumbs.find_elements_by_tag_name('li')[0::2]

    for category in category_elements:
        categories.append(category.text)

    # Dimensions & Weight

    size_weight = browser.find_elements_by_class_name("size-weight")

    weight = size_weight[0].find_elements_by_class_name("value")[0].text

    # Set dimensions text value, might be broken down later
    dimensions = size_weight[1].find_elements_by_class_name("value")[0].text

    # Ranking

    ranks_element = browser.find_elements_by_id('SalesRank')[0]
    rank_items = ranks_element.find_elements_by_class_name('zg_hrsr_item')

    for rank in rank_items:
        ranking = rank.find_elements_by_class_name("zg_hrsr_rank")[0].text
    ladder = rank.find_elements_by_class_name("zg_hrsr_ladder")[0].text
    overall_rank = {"ranking": ranking, "ladder": ladder}
    ranks.append(overall_rank)

    return {'Categories': categories, 'Weight': weight, 'Dimensions': dimensions, 'Ranks': ranks}
