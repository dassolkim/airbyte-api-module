const axios = require('axios').default
// const configInfo = require('../../config/connectConfig')
// const rp = require('request-promise-native')

module.exports = {validateLogic, createLogic, removeLogic}

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
        var defaultUrl = destinationInfo.defaultUrl
        var destination = await createDestination(destinationInfo)
        var destinationId = destination.destinationId
        console.log("created destinationId: ", destinationId)
        if (destinationId != null){
            var getDestinationResult = await getDestination(defaultUrl, destinationId)
            if (getDestinationResult.destinationId == destinationId){
                console.log(getDestinationResult)
                console.log("getDestination succeeded")       
                if (delDestination == true){    
                    var deleteDestinationResult = await deleteDestination(defaultUrl, destinationId)
                    console.log(deleteDestinationResult)
                    console.log("deleteDestination succeeded")
                } else {
                    console.log("deleteDestination failed")
            }
        } else {
            console.log("createDestination failed")
        }    
    }
    if (getDestinationResult.destinationId != null && delDestination == true){
        return true
    } else {
        return destinationId
    }
    } catch (error) {
        console.log(error)
    }
}

async function createLogic(destinationInfo) {
    try{
        var defaultUrl = destinationInfo.defaultUrl
        var destination = await createDestination(destinationInfo)
        var destinationId = destination.destinationId
        if (destinationId != null){
            var getDestinationResult = await getDestination(defaultUrl, destinationId)
            if (getDestinationResult.destinationId == destinationId){
                console.log("created destinationId: ", destinationId)
                console.log("createDestination succeeded")
            }
            return destinationId
        } else { 
            console.log("createDestination failed")
            return null
        }
    } catch (error) {
        console.log(error)
    }
}

async function removeLogic(destinationInfo, destinationId) {
    try{
        var defaultUrl = destinationInfo.defaultUrl
        if (destinationId != null){
            var getDestinationResult = await getDestination(defaultUrl, destinationId)
            if (getDestinationResult.destinationId == destinationId){
                console.log("removed destinationId: ", destinationId)
                console.log("getDestination succeeded")
            }
            var delDestinationResult = await deleteDestination(defaultUrl, destinationId)
            console.log("deleteDestination succeeded")
            return true
        } else { 
            console.log("getDestination failed")
        }
        return false
    } catch (error) {
        console.log(error)
    }
}
