var myFunctions = require('../index');

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

var myCallback = function(data) {
  console.log('got data: '+data);
};
// Invoke addMessage with our fake request and response objects. This will cause the
// assertions in the response object to be evaluated.
//myFunctions.content_bot(req, res);
var get_rest_content = function(callback) {
  client.get("https://frank-ecs-production.up.welt.de/content/102206492.json", function (data, response) {
    // parsed response body as js object 
    var response = JSON.parse(data.toString("utf-8"))['content']['fields']['seoTitle'].toString();
    //console.log(JSON.parse(data.toString("utf-8"))['content']['fields']['seoTitle']);
    // raw response 
    //console.log(response);
    console.log("triggered");
    //response += "ok";
    callback(response);
  });
}

get_rest_content(myCallback);
