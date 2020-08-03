# Lounge Management - Frontend

This project is available accessing the Netlify link:
- https://loungemgmt.netlify.app

Project Overview:

Lounge Management focuses on small bars and shops. Its interface allows the user to keep track of the inventory while serving the clients and the tables. 
It was built to be used by three types of users: the attendant, the barman and the cashier. Each one has a specific role inside the system:

- Attendants: access the system normally in the cellphone, as he walks around all the time. Once the client orders something, the attendant will create a new ticket for that table, or access the existing ticket, and register a new order on it. Once he completes the order, a new request is sent to the bar to get that order ready.

- Terminals: usually the barman, keeps the system opened (normally desktop). As soon as the attendant orders something, a notification pops up on the screen and the barman is able to prepare the order. Once the order is ready, the barman swipes the order out of the screen, and the attendant receives a notification that it's ready to serve the order. In our case, we have three possible terminals: the barman (serves the drinks), the cashiers (chocolates, candy, etc) and Joseph (the guy responsible for food).

- Cashier: opens the system in a desktop terminal. The cashier has access to all the remaining tickets and also can register some small orders (like chocolate and candy). The client goes to the cashier and says the number of the table. The cashier can show a list of all the orders and can charge the entire value or just some items (in case more than one person will pay the bill). In the end, the cashier goes to the balance screen to check everything sold in that shift and closes the cashier.

## Technologies:

BABEL
- Basically a translator, which reads the new features and translates it to a readable format by the browser.

NPM
- Node Package Manager - a library that manages the available packages of node.

REACT
- JavaScript framework for building reactive UI applications.

HOOKS
- New feature inside React, allows us to define states inside components without the need of classes.

ECMASCRIPT 6 (2015)
- JavaScript recent updates on language, released in 2015.

CSS/FILE/HTML/SASS/STYLE/URL LOADERS
- Loaders to be used, declared in webpack. Just like Babel, they convert the files for an understandable language and structure for the browser.

AXIOS
- Promise based HTTP client for the browser and node.js.

SOCKET.IO
- Enables real-time bidirectional event-based communication.

JQUERY
- JavaScript library, required by the other libraries.

BOOTSTRAP
- Styling library for a better CSS development.

SASS/SCSS
- CSS developing method, turns CSS development much easier and more readable.

FONTAWESOME
- Free online icon library.

WEBPACK
- Module bundler. Its main purpose is to bundle JavaScript files for usage in a browser.

GIT
- Version control system, aiming on performance.

DOTENV
- Allows us to use .ENV files in Javascript projects.

## Project Installation:

This project is installed using Node's Package Manager (NPM). If you don't have it on your machine yet, you can download it here: https://nodejs.org/en/;

Also, the version used was Node v8.11.3. If your version is more recent, make sure to use nvm and change to this version. Otherwise this may not work properly.

To do so, you have to use Linux or MAC's Terminal. If you are using Windows, the command prompt won't work. I recommend downloading Git Bash.

This project contains a package.json file, which means that the necessary libraries will be installed once you type the specified command. Being so, please go to the Terminal and access the root file of your project. Once done, run "npm install".

All libraries will be installed inside the node_modules folder.

Go to the root folder and create a new file with the name `.env`. Open it and paste this:

```
API_SOCKET=https://lounge-mgmt-backend.herokuapp.com
API_URL=https://lounge-mgmt-backend.herokuapp.com/api
LOGO_MAIN=https://qmjzbw.dm.files.1drv.com/y4mAs8wL1edrhYYEu4BbVvIAdY6kZNZk5vV99MoT7adEU6DTkZ_BjTgMpAhkFOa2CyAoot8oabljTy-7saIQd4bzZKYGd5frJno62m6H0c73hdNSHReIoeiGXTNZ2v2qLfaMi6Ix4a5G7rTZdOkfA3p69yCagmQ31HWnKbTcb1mzTTjqJ9mNvAnPXBtz-ntvhIhwLrTTCiFvrcX_JFdZQY0lg?width=400&height=400&cropmode=none
TITLE=Lounge MGMT
```

Once done, go to the terminal again and run "npm start".

Webpack will start the server and , once done, you can access it by http://localhost:8080.

## Logging in:

We have 4 different possible users:

Administrator:
login: admin@loungemgmt.com

Cashier:
login: cashier@loungemgmt.com

Terminal:
login: terminal@loungemgmt.com

Attendant:
login: attendant@loungemgmt.com

Password for all these logins: 12345678
