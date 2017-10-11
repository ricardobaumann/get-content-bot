'use strict';

process.env.DEBUG = 'actions-on-google:*';
const App = require('actions-on-google').ApiAiApp;
const functions = require('firebase-functions');

var options ={  
  // customize mime types for json or xml connections 
  //(in your case with a space between type and charset)
  mimetypes:{
      json:["application/json","application/json; charset=utf-8"],
      xml:["application/xml","application/xml; charset=utf-8"]
  },
  user: "biggus",
  password: "dickus"
};

var Client = require('node-rest-client').Client;

var client = new Client(options);

// a. the action name from the make_name API.AI intent
const NAME_ACTION = 'get_content';
// b. the parameters that are parsed from the make_name intent 
const CONTENT = 'content';

exports.content_bot = functions.https.onRequest((request, response) => {
  const app = new App({request, response});
  console.log('Request headers: ' + JSON.stringify(request.headers));
  console.log('Request body: ' + JSON.stringify(request.body));

  function get_content (app) {
    let content = app.getArgument(CONTENT); 
    
    var myCallback = function(data) {
      app.tell(data);
    };

    var get_rest_content = function(callback) {
      client.get("https://frank-ecs-production.up.welt.de/content/102206492.json", function (data, response) {
        var response = JSON.parse(data.toString("utf-8"))['content']['fields']['seoTitle'].toString();
        callback(response);
      });
    }
    
    get_rest_content(myCallback);
  
  }
  // d. build an action map, which maps intent names to functions
  let actionMap = new Map();
  actionMap.set(NAME_ACTION, get_content);


app.handleRequest(actionMap);
});
