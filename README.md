# Dynamo-landing-page
A react-based app to serve for Dynamo landing page. 



Dynamo HomePage WebApp which is used inside Dynamo. This application is specific to Dynamo and utilizes several specific endpoints to work as intended. 

---

## Requirements

For development, you will only need Node.js and a node global package, installed in your environment.

### Node

- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the LTS installer. Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      sudo apt install nodejs
      sudo apt install npm

- #### Other Operating Systems

  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command (version outputs are just examples).

    $ node --version
    v20.10.0

    $ npm --version
    10.2.3

If you need to update `npm`, you can make it using `npm`!

    npm install npm -g

---

## Install

    git https://github.com/DynamoDS/HomePage (tbc)
    cd HomePage
    npm install --force

## Running the project

    npm start

## Simple build for development

    npm run build

## Simple build for production

    npm run build/bundle



## 3rd party libraries and dependencies 
The use of 3rd party libraries was kept to the bare minimum, where developing native elements would have resulted in exceptional time overhead.

- react-intl - library used for localization https://www.npmjs.com/package/react-intl
- react-split-pane - allows resizable (draggable) panel (used in the SidePanel) https://www.npmjs.com/package/react-split-pane
- react-table - a lightweight headless react table https://www.npmjs.com/package/react-table



