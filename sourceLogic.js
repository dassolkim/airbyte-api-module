const rp = require('request-promise-native')
const request = require('request');
const res = require('express/lib/response');
const configInfo = require('./connectConfig.js')

// shared api
module.exports = discoverLogic

function createSource() {
    var url = configInfo.defaultUrl + "sources/create"
    var connectionConfiguration = configInfo.connectSource
    var sourceName = "nodeCreateSource"
    const options = {
        uri: url,
        method: 'POST',
        json: true,
        body: {
            workspaceId: configInfo.workspaceId,
            sourceDefinitionId: configInfo.sourceDefinitionId,
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
    var url = configInfo.defaultUrl + "sources/get"
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
    var url = configInfo.defaultUrl + "sources/discover_schema"
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
    var url = configInfo.defaultUrl + "sources/delete"
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

async function discoverLogic(delSource) {
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
            var catalog = discoverResult.catalog
            console.log(JSON.stringify(catalog, null, 2))
            console.log("source validation is done")
        } else { console.log("discover_schema does not work")}
        if (discoverResult != null && delSource == true){
            var deleteSourceResult = await deleteSource(sourceId)
            console.log(deleteSourceResult)
            console.log("source deletion is done")
        } else { console.log("delete source api does not work")}
        console.timeEnd('api call during time')
    } catch (error) {
        console.log(error)
    }
    return catalog
    // console.log("extract catalog: ", JSON.stringify(catalog, null, 2))
}