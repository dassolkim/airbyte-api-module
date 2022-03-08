const axios = require('axios').default
// const configInfo = require('../../config/connectConfig')
// const rp = require('request-promise-native')

module.exports = {validateLogic, createLogic}

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
}

async function validateLogic(destinationInfo, delDestination) {
    try{
        // console.time("destination validateLogic api call during time")
        var defaultUrl = destinationInfo.defaultUrl
        var destination = await createDestination(destinationInfo)
        var destinationId = destination.destinationId
        console.log("created destinationId: ", destinationId)
        if (destinationId != null){
            var getDestinationResult = await getDestination(defaultUrl, destinationId)
            console.log(getDestinationResult)
            console.log("getDestination succeeded")
        } else {
            console.log("get destination api does not work")
        }
        if (destinationId != null && delDestination == true){    
            var deleteDestinationResult = await deleteDestination(defaultUrl, destinationId)
            // console.log(deleteDestinationResult)
            console.log("deleteDestination succeeded")
        } else {
            console.log("deleteDestination failed")
        }
        // console.timeEnd("destination validateLogic api call during time")
        return true

    } catch (error) {
        console.log(error)
    }
}

async function createLogic(destinationInfo) {
    try{
        // console.time("distribution createLogic api call during time")
        var destination = await createDestination(destinationInfo)
        var destinationId = destination.destinationId
        if (destinationId != null){
            console.log("created destinationId: ", destinationId)
            console.log("createDestination succeeded")
            return destinationId
        } else { 
            console.log("createDestination failed")
            return null
        }
        // console.timeEnd("distribution api call during time")
    } catch (error) {
        console.log(error)
    }
}