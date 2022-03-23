const sourceLogic = require('../airbyte/source/sourceLogic')
const destinationLogic = require('../airbyte/destination/destinationLogic')

module.exports = {remove}


async function remove(destinationInfo, destinationId){

    console.log("Start deleteDestination")
    console.time("deleteDestination api call during time")
    var delDestination = await destinationLogic.removeLogic(destinationInfo, destinationId)
    // console.log("destinationLogic return: ", destinationValidate)
    console.timeEnd("deleteDestination api call during time")
    if (delDestination == true){
        // console.log("validate distribution is successful")
        return true
    } else {
        return false
    }
}
