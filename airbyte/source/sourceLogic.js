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
        var defaultUrl = sourceInfo.defaultUrl
        var source = await createSource(sourceInfo)
        var sourceId = source.sourceId
        if (source != null){
            console.log("created sourceId: ", sourceId)
            var getSourceResult = await getSource(defaultUrl, sourceId)
            // console.log(getSourceResult)
            if (getSourceResult.sourceId == sourceId){
                console.log("getSource succeeded")
                var discoverResult = await discoverSource(defaultUrl, sourceId)
                var catalog = discoverResult.catalog
                // console.log(JSON.stringify(catalog, null, 2))
                if (catalog != null){
                    console.log("discoverSource succeeded")
                } else {
                    console.log("discoverSource failed")
                }
                if (delSource == true){
                    var deleteSourceResult = await deleteSource(defaultUrl, sourceId)
                    // console.log(deleteSourceResult)
                    console.log("deleteSource succeeded")
                } else {
                    console.log("deleteSource failed")
                }
            } else {
                console.log("getSource failed")
            }
        } else {
            console.log("createSource failed")
        }       
        if (catalog != null && delSource == true){
            return true           
        }else{
            return false
        }
    } catch (error) {
        console.log(error)
    }
}

async function createLogic(sourceInfo) {
    try{
        var defaultUrl = sourceInfo.defaultUrl
        var source = await createSource(sourceInfo)
        var sourceId = source.sourceId
        console.log("created sourceId: ", sourceId)
        var getSourceResult = await getSource(defaultUrl, sourceId)
        if (getSourceResult.sourceId == sourceId){
            var discoverResult = await discoverSource(defaultUrl, sourceId)
            var catalog = discoverResult.catalog
            console.log("discverSource succeeded")
            // console.log(JSON.stringify(catalog, null, 2))
        } else { 
            console.log("discoverSource failed")
            return null
        }
        var results = {
            sourceId: sourceId,
            syncCatalog: catalog
        }
        return results
    } catch (error) {
        console.log(error)
    }
}
