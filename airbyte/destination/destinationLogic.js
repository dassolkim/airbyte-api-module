const axios = require('axios').default
const configInfo = require('../../config/connectConfig')

// const rp = require('request-promise-native')

module.exports = {destinationLogic, createDestination, getDestination, deleteDestination}

function createDestination(destinationInfo) {
    var url = destinationInfo.defaultUrl + "destinations/create"
    const body = {
        workspaceId: destinationInfo.workspaceId,
        destinationDefinitionId: destinationInfo.destinationDefinitionId,
        connectionConfiguration: destinationInfo.connectionConfiguration,
        name: destinationInfo.name
    }
    var result = axios.post(url, body)
    .then(function (response){
        var data = response.data
        return data
    }).catch(function (error){
        console.log(error)
    })
    return result
    /*
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

function getDestination(defaultUrl, destinationId){
    var url = defaultUrl + "destinations/get"
    const body = {
        destinationId: destinationId
    };
    var result = axios.post(url, body)
    .then(function (response){
        var data = response.data
        return data
    }).catch(function (error){
        console.log(error)
    })
    return result
    /*
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

function deleteDestination(defaultUrl, destinationId) {
    var url = defaultUrl + "destinations/delete"
    const body = {
        destinationId: destinationId
    }
    var result = axios.post(url, body)
    .then(function (response){
        var data = response.data
        return data
    }).catch(function (error){
        console.log(error)
    })
    return result
    /*
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

async function destinationLogic(destinationInfo, delDestination) {
    try{
        console.time('distribution api call during time')
        var defaultUrl = destinationInfo.defaultUrl
        var destination = await createDestination(destinationInfo)
        var destinationId = destination.destinationId
        console.log("created destinationId: ", destinationId)
        if (destinationId != null){
            var getDestinationResult = await getDestination(defaultUrl, destinationId)
            console.log(getDestinationResult)
            console.log("getDestination succeeded")
        } else { console.log("get destination api does not work")}
        if (destinationId != null && delDestination == true){    
            var deleteDestinationResult = await deleteDestination(defaultUrl, destinationId)
            console.log(deleteDestinationResult)
            console.log("deleteDestination succeeded")
        } else { console.log("deleteDestination failed")}
        console.timeEnd('distribution api call during time')
        if (delDestination != true) {
            return destinationId
        }
        else {
            return null
        }
    } catch (error) {
        console.log(error)
    }
}

/** 
async function testDestinationLogic(destinationInfo, delDestination) {
    try{
        console.time('distribution api call during time')
        var defaultUrl = destinationInfo.defaultUrl
        var destination = await createDestination(destinationInfo)
        if (destination != null){
            var destinationId = destination.destinationId
            console.log("destinationId: ", destinationId)
            var getDestinationResult = await getDestination(defaultUrl, destinationId)
            console.log(getDestinationResult)
            console.log("destination lookup is done")
        } else { console.log("get destination api does not work")}
        if (getDestinationResult != null && delDestination == true){    
            var deleteDestinationResult = await deleteDestination(defaultUrl, destinationId)
            console.log(deleteDestinationResult)
            console.log("destination deletion is done")
        } else { console.log("delete destination api does not work")}
        console.timeEnd('distribution api call during time')
        if (delDestination != true) {
            return destinationId
        }
        else {
            return getDestinationResult
        }
    } catch (error) {
        console.log(error)
    }
}
destinationLogic(true)
*/
