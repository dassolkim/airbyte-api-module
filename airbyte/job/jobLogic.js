const axios = require('axios').default

module.exports = {debugJob, getJob, cancelJob}

function getJob(defaultUrl, jobId) {

    const url = defaultUrl + "jobs/get"
    const body = {
        id: jobId
    }
    const result = axios.post(url, body)
    .then(function (response){
        const data = response.data
        return data
    }).catch(function (error){
        console.log(error)
    })
    return result
}

function debugJob(defaultUrl, jobId){

    const url = defaultUrl + "jobs/get_debug_info"
    const body = {
        id: jobId
    }
    const result = axios.post(url, body)
    .then(function (response){
        const data = response.data
        return data
    }).catch(function (error){
        console.log(error)
    })
    return result
}

function cancelJob(defaultUrl, jobId){

    const url = defaultUrl + "jobs/cancel"
    const body = {
        id: jobId
    }
    const result = axios.post(url, body)
    .then(function (response){
        const data = response.data
        return data
    }).catch(function (error){
        console.log(error)
    })
    return result
}

async function validateLogic(destinationInfo, delDestination) {
    try{
        const defaultUrl = destinationInfo.defaultUrl
        const destination = await createDestination(destinationInfo)
        const destinationId = destination.destinationId
        let check
        console.log("created destinationId: ", destinationId)
        if (destinationId != null){
            const getDestinationResult = await getDestination(defaultUrl, destinationId)
            if (getDestinationResult.destinationId == destinationId){
                check = true
                console.log(getDestinationResult)
                console.log("getDestination succeeded")       
                if (delDestination == true){    
                    const deleteDestinationResult = await deleteDestination(defaultUrl, destinationId)
                    if (deleteDestinationResult == true){
                        console.log("deleteDestination succeeded")
                    } else {
                        console.log("deleteDestinatoin failed")
                    }
                } else {
                    console.log("do not delete destination")
            }
        } else {
            check = false
            console.log("createDestination failed")
        }    
    }
    if (check == true && delDestination == true){
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
        const defaultUrl = destinationInfo.defaultUrl
        const destination = await createDestination(destinationInfo)
        const destinationId = destination.destinationId
        if (destinationId != null){
            const getDestinationResult = await getDestination(defaultUrl, destinationId)
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
        const defaultUrl = destinationInfo.defaultUrl
        if (destinationId != null){
            const getDestinationResult = await getDestination(defaultUrl, destinationId)
            if (getDestinationResult.destinationId == destinationId){
                console.log("removed destinationId: ", destinationId)
                console.log("getDestination succeeded")
            }
            const delDestinationResult = await deleteDestination(defaultUrl, destinationId)
            if (delDestinationResult == true){
                console.log("deleteDestination succeeded")
                return true
            } else {
                console.log("deleteDestinatoin failed")
            }
        } else { 
            console.log("getDestination failed")
        }
        return false
    } catch (error) {
        console.log(error)
    }
}
