# leaguefrenzy

Site built for all things League of Legends!

site built to show you Champions a Champion is either strong against, or weak against & to look up ranked information on a Summoner. I built a little webscraping script to scrape the data on <a href="http://www.championselect.net/champions">http://www.championselect.net/champions</a> using the Request & Cheerio(backend jQuery) packages. ( grey area? ).

### Backend
Expressjs (node), mongoose (mongodb), Cheerio and Request for the scraper.

### Frontend
Node Handlebars to render data from the backend to the frontend, Gulp to bundle the JS and CSS, League of Legends API to search for Summoners, twitch API to get the streamers, Bootstrap.

