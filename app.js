// const { json } = require('express/lib/response');
const uuidv1 = require('uuid/v1')
// const https = require('https')
// const parsejson = require('parse-json')
const rp = require('request-promise-native')
const JSON = require('fast-json-stable-stringify')
const request = require('request');
const res = require('express/lib/response');

var jsonDataObj = {destinationId: "3ca90345-492e-44f8-95cd-72cb2616af33"};
const datasetId = uuidv1()
const workspaceId = "ff385b87-9469-47cb-9733-4eb23d771987"
const destinationDefinitionId = "25c5221d-dce2-4163-ade9-739ef790f503"
const defaultUrl = "http://114.70.235.40:18000/api/v1/"
const sourceDefinitionId = "decd338e-5647-4c0b-adf4-da0e75f5a750"

// const options = {
//     uri: defaultUrl + "destinations/list",
//     method: 'POST',
//     body: {
//         workspaceId: workspaceId
//     },
//     json: true,
//   };
//   request.post(options,function(err, response, body){
//       console.log(response.body);
//   })

function returnBody(){

}

function createSource() {
    

    var url = defaultUrl + "sources/create"
    var connectionConfiguration = {
        "host": "114.70.235.40",
        "port": 15432,
        "database": "dbt_custom",
        "password": "dke!!214!!",
        "username": "knu"
    }
    var sourceName = "nodeCreateSource"
    const options = {
        uri: url,
        method: 'POST',
        json: true,
        body: {
            workspaceId: workspaceId,
            sourceDefinitionId: sourceDefinitionId,
            connectionConfiguration: connectionConfiguration,
            name: sourceName
        },
      };
    return rp(options, function (respose, body) {
        var res = JSON(body);
        return res;
    })
    

    // request.post(options, function (err, response, body){
    //       console.log("create source complete")
    //       const res = body
    //       console.log(typeof res)
    //       console.log("result: ", res)
    //       callback(response.body)
          
    //   });
}

function getSource(sourceId){
    var url = defaultUrl + "sources/get"
    const options = {
        uri: url,
        method: 'POST',
        body: {
            sourceId: sourceId
        },
        json: true,
      };
      request.post(options,function(err, response, body){
          console.log("get source complete")
          console.log(response.body)
          requestIdleCallback(body)
      })

}
function discoverSchema() {
    var url = defaultUrl + "sources/discover_schema"
    var sourceId = ""
    const options = {
        uri: url,
        method: 'POST',
        body: {
            workspaceId: workspaceId,
            sourceDefinitionId: sourceDefinitionId,
            connectionConfiguration: connectionConfiguration,
            name: sourceName
        },
        json: true,
      };
      request.post(options,function(err, response, body){
          console.log("discover_shcema complete")
          console.log(response.body);
      })
}

async function discoverLogic() {
    var sources = await createSource();
    console.log(sources)
    var sourceId = sources.sourceId
    console.log("sourceId: ", sourceId)
    
}
discoverLogic();
