# Dynamo Home Page
A react-based app to serve for Dynamo landing page. 

## Layout
The sidebar contains links to the 3 main modules of the Home Page:
- Recent - points to the last 'n' number of files (the number of recent files can be changed by the user in Dynamo preferences window)
- Samples - this is the location of the Sample files. Currently, this is empty under Dynamo Sandbox
- Learning - a one-stop-shop for Dynamo learning resources

### Recent module
![image](https://github.com/dnenov/DynamoHomePage/assets/5354594/d47687b6-dd91-46eb-a9a3-f97eb44a7ddb)
### Samples module
![image](https://github.com/dnenov/DynamoHomePage/assets/5354594/21279b42-3a55-4f22-8872-e084035598ba)
### Learning module
![image](https://github.com/dnenov/DynamoHomePage/assets/5354594/c4cc53c7-8d3d-4d16-bd82-19530169c313)

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

    git https://github.com/DynamoDS/DynamoHomePage (tbc)
    cd DynamoHomePage
    npm install --force

## Running the project
The project has sufficient assets to cover the base-case implementation during development. 

    npm start

## Simple build for development

    npm run build

## Simple build for production

    npm run build/bundle

## Localization
Localization is done via `react-intl` library. The current setup relies on the combination of these 2 elements:
- localization files stored inside the `\src\locales\` folder (add as many localization files as needed)
- adding new locales to the switch statement inside the `localization.js` file:
```
export const getMessagesForLocale = (locale) => {
  switch(locale) {
    case 'en':
      return englishMessages;
    default:
      return englishMessages;
  }
}; 
```

## 3rd party libraries and dependencies 
The use of 3rd party libraries was kept to the bare minimum, where developing native elements would have resulted in exceptional time overhead.

- react-intl - library used for localization https://www.npmjs.com/package/react-intl
- react-split-pane - allows resizable (draggable) panel (used in the SidePanel) https://www.npmjs.com/package/react-split-pane
- react-table - a lightweight headless react table https://www.npmjs.com/package/react-table



