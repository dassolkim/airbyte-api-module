const uuidv1 = require('uuid/v1')
const rp = require('request-promise-native')
const request = require('request');
const res = require('express/lib/response');

const datasetId = uuidv1()
const workspaceId = "ff385b87-9469-47cb-9733-4eb23d771987"
const destinationDefinitionId = "25c5221d-dce2-4163-ade9-739ef790f503"
const defaultUrl = "http://114.70.235.40:18000/api/v1/"
const sourceDefinitionId = "decd338e-5647-4c0b-adf4-da0e75f5a750"
const dbConfig = require('./connectConfig.js')

function main(){
    console.log("discover logic is start")
    console.log("datasetId: ", datasetId)
    discoverLogic()
}
if (require.main == module){
    main()
}

function createSource() {
    var url = defaultUrl + "sources/create"
    var connectionConfiguration = dbConfig.connectConf
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
    return rp(options, function (error, respose, body) {
        if (error) {
            console.log(error);
        } else {
            var result = body;
            return result;
        }
    })
}

function getSource(sourceId){
    var url = defaultUrl + "sources/get"
    const options = {
        uri: url,
        method: 'POST',
        body: {
            sourceId: sourceId
        },
        json: true
    };
    return rp(options, function (error, respose, body) {
        if (error) {
            console.log(error);
        } else {
            var result = body;
            return result;
        }
    })
}

function discoverSchema(sourceId) {
    var url = defaultUrl + "sources/discover_schema"
    var sourceId = sourceId
    const options = {
        uri: url,
        method: 'POST',
        body: {
            sourceId: sourceId
        },
        json: true
    };
    return rp(options, function (error, respose, body) {
        if (error) {
            console.log(error);
        } else {
            var result = body
            return result;
        }
    })
}

function deleteSource(sourceId) {
    var url = defaultUrl + "sources/delete"
    var sourceId = sourceId
    const options = {
        uri: url,
        method: 'POST',
        body: {
            sourceId: sourceId
        },
        json: true
    };
    return rp(options, function (error, respose, body) {
        if (error) {
            console.log(error);
        } else {
            var result = body;
            return result;
        }
    })
}

async function discoverLogic() {
    try{
        console.time('api call during time')
        var source = await createSource()
        // console.log(source)
        if (source != null){
            var sourceId = source.sourceId
            console.log("sourceId: ", sourceId)
            var getSourceResult = await getSource(sourceId)
            console.log(getSourceResult)
            console.log("source lookup is done")
        } else { console.log("get source api does not work")}
        if (getSourceResult != null){
            var discoverResult = await discoverSchema(sourceId)
            console.log(JSON.stringify(discoverResult, null, 2))
            console.log("source validation is done")
        } else { console.log("discover_schema does not work")}
        if (discoverResult != null){
            var deleteSourceResult = await deleteSource(sourceId)
            console.log(deleteSourceResult)
            console.log("source deletion is done")
        } else { console.log("delete source api does not work")}
        console.timeEnd('api call during time')
    } catch (error) {
        console.log(error)
    }
}

