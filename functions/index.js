'use strict';

process.env.DEBUG = 'actions-on-google:*';
const App = require('actions-on-google').ApiAiApp;
const functions = require('firebase-functions');

// a. the action name from the make_name API.AI intent
const NAME_ACTION = 'get_content';
// b. the parameters that are parsed from the make_name intent 
const CONTENT = 'content';

const contentMap = {"sports" : "sports are very nice and healthy", "politiks" : "politiks are boring. try sports"};

exports.content_bot = functions.https.onRequest((request, response) => {
  const app = new App({request, response});
  console.log('Request headers: ' + JSON.stringify(request.headers));
  console.log('Request body: ' + JSON.stringify(request.body));


// c. The function that generates the silly name
  function get_content (app) {
    let content = app.getArgument(CONTENT);
    
    app.tell('Alright,' + contentMap[content]);
    
  }
  // d. build an action map, which maps intent names to functions
  let actionMap = new Map();
  actionMap.set(NAME_ACTION, get_content);


app.handleRequest(actionMap);
});
