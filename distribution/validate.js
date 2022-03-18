const sourceLogic = require('../airbyte/source/sourceLogic')
const destinationLogic = require('../airbyte/destination/destinationLogic')

module.exports = {validateSource, validateDestination}

async function validateSource(sourceInfo){
    
    var delSource = true

    console.log("Start validationSource")
    console.time("validateSource api call during time")
    var sourceValidate = await sourceLogic.validateLogic(sourceInfo, delSource)
    // console.log("source validateLogic return: ", sourceValidate)
    console.timeEnd("validateSource api call during time")
    if (sourceValidate == true) {
        // console.log("validation suceess")
        return true
    } else {
        return false
    }
}

async function validateDestination(destinationInfo){
    var delDestination = true
    console.log("Start validateDestination")
    console.time("validateDestination api call during time")
    var destinationValidate = await destinationLogic.validateLogic(destinationInfo, delDestination)
    // console.log("destinationLogic return: ", destinationValidate)
    console.timeEnd("validateDestination api call during time")
    if (destinationValidate == true){
        // console.log("validate distribution is successful")
        return true
    } else {
        return false
    }
}
