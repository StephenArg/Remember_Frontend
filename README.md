# Remember Journal

###### Online journal that encourages the user to read through a random previous entry, daily | [Demo](https://remember-journal.herokuapp.com/)

### Clone and run application

* Run rails back end
  ```bash
  git clone git@github.com:StephenArg/Remember_Backend.git
  bundle install
  rails s -p 3001
  ```
* Run react front end
  ```bash
  git clone git@github.com:StephenArg/Remember_Frontend.git
  npm install
  ```
  After installing packages, create a file called `.env` in the main directory and add this line to it.
  `REACT_APP_API_LOCATION=localhost:3001`
  After this, run `npm start`
  
A chat application that pairs its users randomly and allows for websocket-enabled text chat and video conferencing between the participants.

A journaling application that encourages the user to revist past entries. App is capable of searching for past entries by date. Making entries for previous days where daily entry was missed. Ability to download backup file which can be used to restore previous entries should the user need to change accounts or want a backup for themselves in JSON form.

## What's being used:
- React
- Rails
- PostgreSQL
