const sourceLogic = require('../../airbyte/source/sourceLogic')
const destinationLogic = require('../../airbyte/destination/destinationLogic')

module.exports = {remove}

async function remove(sourceInfo, sourceId, destinationInfo, destinationId){

    var delDestination = await removeDestination(destinationInfo, destinationId)
    var delSource = await removeSource(sourceInfo, sourceId)

    if (delSource == true && delDestination == true){
        console.log("remove succeeded")
        return true
    } else {
        console.log("remove failed")
        return false
    }
}

async function removeDestination(destinationInfo, destinationId){

    console.log("Start deleteDestination")
    console.time("deleteDestination api call during time")
    var delDestination = await destinationLogic.removeLogic(destinationInfo, destinationId)
    // console.log("destinationLogic return: ", destinationValidate)
    console.timeEnd("deleteDestination api call during time")
    if (delDestination == true){
        console.log("removeDestination succeeded")
        return true
    } else {
        console.log("removeDestination failed")
        return false
    }
}

async function removeSource(sourceInfo, sourceId){

    console.log("Start deleteSource")
    console.time("deleteSource api call during time")
    var delSource = await sourceLogic.removeLogic(sourceInfo, sourceId)
    console.timeEnd("deleteSource api call during time")
    if (delSource == true){
        console.log("removeSource succeeded")
        return true
    } else {
        console.log("removeSource failed")
        return false
    }
}
