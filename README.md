# API Readme and Runbook

## Thought and notes

Note on completion:

I spent most of the time for this coding challenge on the API side. This is for 2 reasons:
1. I have built out complete frontend systems in React many times before and know the amount of scss time things take.
2. I am not a Python developer, but the system necessitated it, so a lot of my time was learning all the best practises for API building and web scraping in python/flask

Because of this the front end is very utilitarian. In that it just shows the info that is returned with no extra styling

--- 
Below are some of the mindsets, thoughts and notes that should be considered when viewing this project.

1. Even though this is a code challenge, I will be treating all aspects of it as a spike that will hopefully be a production system.
- This will include all aspects from product requirements, architecture, language/framework choices, design deployment and any other aspect of the project.

2. The technologies in this challenge will not be chose based on the authors current capabilities, but rather the best tools for the job.
- For this project, it will be assumed that the development team build it are capable of learning (in short term) and using any popular programming language and framework.
- Because of this, the only consideration will be given to things like the age and maturity of the framework, its speed, safety and its ability to perform current and future use-cases.

3. I will NOT be adding authentication with JWT
Why: It is the next thing I would di with another hours work.
But for this project it does not show anything unique, rather I worked on the unique parts of this project

## Running the project:

### 1. Install chromedriver

To run this project the machine running it needs to have chromedriver installed.

This need to:

1. Download and store the file from this site:
https://sites.google.com/a/chromium.org/chromedriver/

2. Added to the users path

*** It may be best to just put this in the `/usr/local/bin` folder if you are using a mac. This folder is already in the path and removes the need to add a new path variable.

### 2. Add a local .env file

It is never good practise to commit a .env file. So that wont be done here. You will need to add a file `/API/.env` and it will contain 1 value:

```
SQL_URL=postgresql://localhost:5432/junglescout
```

### 3. Create a new database in postgres

Run the following command in your terminal.

<your-db-name-choice> is the db name from step 2

```bash
createdb junglescout
```

Note: This assumes you have postgres installed and setup on your machine. For instructions on this see: https://www.postgresql.org/download/macosx/
- Personally I like the homebrew method

### 4. Setup a virtualenv (Optional but highly suggested)

This project has some imports of binaries for the speed of the application. There is no need to muddy up your python with these for a coding challenge.

Create a virtualenv for this project and then source it.

```bash
virtualenv robs-coding-challange
source /.virtualenvs/jungle-scout-code/bin/activate
```

### 5. Run the bootstrap script

This sets up the schema in your db

```bash
pip install -r requirments.txt
python bootstrap.py
```

### 6. Run the app

```bash
python main.py
```

Your local api should be running at `http://localhost:5000/`

You can test to see it in action on its own with the following cURL command

```bash
## Get Product Info by Amazon ID
curl "http://localhost:5000/v1/product/B002QYW8LW"
```

Note: The first time with a new ID will be slow while it scrapes the internet. Second time it pulls from the db so it is faster.

### 7. run the frontend

cd into the `web-app` directory and type the following in your terminal

```bash
yarn start
```

## Some assumptions

> We cannot access to Amazon product API
- Of course this would be the best and most scalable way to build this product.
- We will find another way, Spoiler: We Scraping

> Amazon ASIN #s are unique
- This will be used as the primary key for a table in our DB so they will need to be unique.

## Technology choices

Assuming that we cannot have access to the reviews from every platform, and assuming we still want to get as much review material as possible, we will need to build a web scraper that will be able to extract the various values from the various review sites we want access to.

This puts us in the position of having restricted choices when building the review aggregation of the API.

### API Tech

We are going to use Python for our API.

#### Why: Selenium to run headless browsers.

Big sites like Amazon want to prevent this type of data gathering from happening, they dont simply return data from an API. They return the html itself (and in cryptic forms) to the front end to try and prevent this.

Then if they think you are a robot, they will return a captcha page to stop you from loading the page.

To get around this we must use a headless browser in Selenium to get the HMTL elements back that we cna analyze.

(Old) Alternative option: PhantonJS

Some of us have used PhantomJS before to do the same thing, maybe with CasperJS. But PhantonJS has been deprecated and is not supported. All the other platforms built on it are also deprecated.

This platform can not be expected to scale or even to last a long time.

### Frontend Tech

React/Redux will be used for the front end. Along with the new Context API and hooks.

#### Why: Hiring, scalability, and documentation

Pros:
- A project can be setup and scaffold quickly
- There are many developers out there who know the platform and can be up to speed quick
- Lots of documentation and libraries
- Support and buy-in from many large companies

Cons:
- Many ways to write (VERY BAD) working React code
- We platforms are always changing and evolving (the JS world)

Alternative: VueJS

VueJS is a platform I like a lot and would be a god alternative to React, it is gaining a LOT of steam and may overtake in the future.

It would also be a safe choice in my opinion

#### Theme

In the interest of time and asthetics I have decided to use a theme that I have purchased and have used for product spiked before.

Isomorphic https://themeforest.net/item/isomorphic-react-redux-admin-dashboard/20262330

If if this quick product spike was something that we wnated to put into production then it should be designed from the ground up to
- Match the design asthetics of the Jungle Scouts apps
- Match the design standards
- Be designed with user experince in front of mind


## Data model

### Database tech

For this project we will be using PostrgeSQL as a data base. This is because it is a trusted SQL option that is well documented and will have libraries to connect with the DB from almost all programming languages.

Why SQL? vs No-SQL

In the end there is no real reason to choose one over the other. The data model is very simplistic and in the end we will be sending JSON objects to though the API either way.

The one advantage of this is that SQL will have unigue ids that we can use, in this case the primary key will be the Amazon ASIN #.

### Schema

The schema is very simple and will have the format defined in the specifications document, it includes:

- id (Primary Key) [String]
- categories [JSON(Array)]
- weight [String]
- dimensions [String]
- ratings [JOSN(Array)]
- lastFetched [DateTime]

## Testing

Sadly, having little experience with Python building a professional tested system, I was not able to pick up TDD in the language for this project.

I would always test everything possible with Unit tests, regression tests, and end-to-end test and smoke tests. This is best to do directly after the proof of concept is fleshed out.

## Possible expansions

Obvious: JWT, but also with refresh tokens to keep the user logged in even with an extended active session.

1. Running this in a vagrant machine or setup using a docker file. This would eliminate the need to install anything on the users own system.

2. Redis to RabbitMQ to make a queue

3. Security with some kind of refresh tokens

4. Exponential backoff
- rotate IPs so we dont get blocked

5. Scheduler
- keeps # of reqs per ip at a predictable level
- traffic distribution and rate limit requests

6. Billing base don API calls per month

7. General security for user data etc.

8. Lots of different header should rotate to look like it is coming from different browser and device types.

9. Scheduler that fetched new product info every day.

10. Rotating IP's so the site we are scraping don't catch on an ban our IP.






