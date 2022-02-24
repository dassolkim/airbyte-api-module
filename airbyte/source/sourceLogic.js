const axios = require('axios').default
const configInfo = require('../../config/connectConfig')

/* 
const rp = require('request-promise-native')
const request = require('request')
const res = require('express/lib/response')
*/

// shared api
module.exports = {discoverLogic, createSource, getSource, discoverSchema, deleteSource}

function createSource() {
    var url = configInfo.defaultUrl + "sources/create"
    var connectionConfiguration = configInfo.connectSource
    var sourceName = "nodeCreateSource1"
    const body = {
        workspaceId: configInfo.workspaceId,
        sourceDefinitionId: configInfo.sourceDefinitionId,
        connectionConfiguration: connectionConfiguration,
        name: sourceName
    }
    var result = axios.post(url, body)
    .then(function (response){
        var data = response.data
        return data

    }).catch(function (error){
        console.log(error)
    })
    return result
    /* request and request-promise-naive are deprecated.
    return rp(options, function (error, respose, body) {
        if (error) {
            console.log(error);
        } else {
            var result = body;
            return result;
        }
    })
    */
}

function getSource(sourceId){
    var url = configInfo.defaultUrl + "sources/get"
    const body = {
        sourceId: sourceId
    };
    var result = axios.post(url, body)
    .then(function (response){
        var data = response.data
        return data

    }).catch(function (error){
        console.log(error)
    })
    return result
}

function discoverSchema(sourceId) {
    var url = configInfo.defaultUrl + "sources/discover_schema"
    const body = {
        sourceId: sourceId
    }
    var result = axios.post(url, body)
    .then(function (response){
        var data = response.data
        return data
    }).catch(function (error){
        console.log(error)
    })
    return result
    /* request and request-promise-naive are deprecated.
    return rp(options, function (error, respose, body) {
        if (error) {
            console.log(error);
        } else {
            var result = body
            return result;
        }
    })
    */
}

function deleteSource(sourceId) {
    var url = configInfo.defaultUrl + "sources/delete"
    // var sourceId = sourceId
    const body = {
        sourceId: sourceId
    }
    var result = axios.post(url, body)
    .then(function (response){
        var data = response.data
        return data
    }).catch(function (error){
        console.log(error)
    })
    return result
    /* request and request-promise-naive are deprecated.
    return rp(options, function (error, respose, body) {
        if (error) {
            console.log(error);
        } else {
            var result = body;
            return result;
        }
    })
    */
}

async function discoverLogic(delSource) {
    try{
        console.time('source api call during time')
        var source = await createSource()
        console.log(source)
        if (source != null){
            var sourceId = source.sourceId
            console.log("sourceId: ", sourceId)
            var getSourceResult = await getSource(sourceId)
            console.log(getSourceResult)
            console.log("source lookup is done")
        } else { console.log("get source api does not work")}
        if (sourceId != null){
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
        console.timeEnd('source api call during time')
        if (delSource != true){
            return sourceId
        }
        else {
            return catalog
        }
    } catch (error) {
        console.log(error)
    }
    // console.log("extract catalog: ", JSON.stringify(catalog, null, 2))
}

// discoverLogic(true)