# Healthiest Thing At

The only menu you can trust in the drive thru. http://www.healthiestthingat.com/

![HealthiestThingAt](https://i.imgur.com/PBtqgnP.png "HealthiestThingAt")

## Project Background/TODO:
#### THE PROBLEM:
I've suddenly found myself travelling much more often, and end up pulling into the drive-thru more than I'd like to admit. I'd like to have a hand-held database showing me an interactive menu for every restaurant in the world, that I can filter by diet preference or nutritional value. 
Also, I wanted to learn PostgreSQL and thought this was the perfect opportunity to do so. 

#### THE GOAL: 
The goal is to be more convenient than manually looking up the nutritional information of a menu item you are about to purchase while eating out. 

#### CURRENT PROGRESS:
* Currently refactoring the backend API to serve a React.js frontend
* The live site right now is just Node/Express and jQuery/Javscript

#### TO DO:
* Refactor API to handle data manipulation such as search, filtering, and sorting.
* Refactor front end to serve a React front end
* Add advterising opportunities for sponsors

#### Issues/Security Concerns:
* N/A

## Usage:
There are three **required processes** to be running in order to use this application:
1. The Node.js Server
2. The React.js Client
3. The PostgreSQL Database

The PostgreSQL server must have the fuzzystrmatch extension installed to use the Levanshtein distance SQL query in api/index.js, so:
`$ psql dbname`
`dbname=# create extension fuzzystrmatch`

Start the Node.js server:
`$ cd /path/to/installationdir`
`$ npm install`
`$ npm run start:dev`

Start the React.js client:
`$ cd /path/to/installationdir/client`
`$ npm install`
`$ npm run start`