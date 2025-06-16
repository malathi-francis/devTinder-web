DevTinder-web (frontend)

create a vite + react application
  ->npm create vite@latest devTinder-web -- --  (refer vite docs)
remove unwanted code from app.jsx (main.jsx is the start point of the app).
install tailwind css
install daisy ui 
add navbar component from daisy ui (app.jsx)
create a NavBar.jsx for navbar and import it in app.jsx and add <navbar/>
install reat router - npm install react-router-dom (for routing)
create BrowseRouter > Routes > Route in app.jsx
create loginpage
useState() for fields to fetch values
axios for API (npm i axios)
CORS install cors in backend (to solve cors error) setup in app.js in backend and send withCredentials    - - from   frontend while calling the login api.
- withCredentials is for sending token to all calls (application -> cookies)
install redux toolit (npm install @reduxjs/toolkit react-redux)
configure a store, add a provider, create slice, add reducer to store
navBar update profile url as soon as user logs in.

