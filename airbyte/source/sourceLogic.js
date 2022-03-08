const axios = require('axios').default
// const configInfo = require('../../config/connectConfig')

/* 
const rp = require('request-promise-native')
const request = require('request')
const res = require('express/lib/response')
*/

// shared api
module.exports = {validateLogic, createLogic}

function createSource(sourceInfo) {
    var url = sourceInfo.defaultUrl + "sources/create"
    // var sourceName = "api_source"
    const body = {
        workspaceId: sourceInfo.workspaceId,
        sourceDefinitionId: sourceInfo.sourceDefinitionId,
        connectionConfiguration: sourceInfo.connectionConfiguration,
        name: sourceInfo.name
    }
    var result = axios.post(url, body)
    .then(function (response){
        var data = response.data
        return data

    }).catch(function (error){
        console.log(error)
    })
    return result
}

function getSource(defaultUrl, sourceId){
    var url = defaultUrl + "sources/get"
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

function discoverSource(defaultUrl, sourceId) {
    var url = defaultUrl + "sources/discover_schema"
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
}

function deleteSource(defaultUrl, sourceId) {
    var url = defaultUrl + "sources/delete"
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
}

async function validateLogic(sourceInfo, delSource) {
    try{
        // console.time('validateLogic api call during time')
        var defaultUrl = sourceInfo.defaultUrl
        var source = await createSource(sourceInfo)
        var sourceId = source.sourceId
        /** 
         * getSource
         * if (source != null){
            console.log("created sourceId: ", sourceId)
            var getSourceResult = await getSource(defaultUrl, sourceId)
            // console.log(getSourceResult)
            console.log("getSource succeeded")
        } else { console.log("getSource failed")}
         */ 
        if (sourceId != null){
            var discoverResult = await discoverSource(defaultUrl, sourceId)
            var catalog = discoverResult.catalog
            // console.log(JSON.stringify(catalog, null, 2))
            console.log("discoverSource succeeded")
        } else { 
            console.log("discoverSource failed")
        }
        if (discoverResult != null && delSource == true){
            var deleteSourceResult = await deleteSource(defaultUrl, sourceId)
            console.log(deleteSourceResult)
            console.log("deleteSource succeeded")
        } else { 
            console.log("deleteSource failed")
        }
        // console.timeEnd('validateLogic api call during time')
        if (delSource != true){
            return sourceId
        }
        else {
            return true
        }
    } catch (error) {
        console.log(error)
    }
}

async function createLogic(sourceInfo) {
    try{
        // console.time('createLogic api call during time')
        var defaultUrl = sourceInfo.defaultUrl
        var source = await createSource(sourceInfo)
        var sourceId = source.sourceId
        if (sourceId != null){
            var discoverResult = await discoverSource(defaultUrl, sourceId)
            var catalog = discoverResult.catalog
            // console.log(JSON.stringify(catalog, null, 2))
        } else { 
            console.log("discoverSource failed")
            return null
        }
        // console.timeEnd('createLogic api call during time')
        var results = {
            sourceId: sourceId,
            syncCatalog: catalog
        }
        return results
    } catch (error) {
        console.log(error)
    }
}