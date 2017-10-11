'use strict';

process.env.DEBUG = 'actions-on-google:*';
const App = require('actions-on-google').ApiAiApp;
const functions = require('firebase-functions');

var Client = require('node-rest-client').Client;

var client = new Client();

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

    // direct way 
    client.get("https://frank-ecs-production.up.welt.de/content/102206492.json", function (data, response) {
      // parsed response body as js object 
      console.log(data);
      // raw response 
      console.log(response);

      app.tell('Alright,' + JSON.stringify(data).substring(1,4));
    });
    
  }
  // d. build an action map, which maps intent names to functions
  let actionMap = new Map();
  actionMap.set(NAME_ACTION, get_content);


app.handleRequest(actionMap);
});
