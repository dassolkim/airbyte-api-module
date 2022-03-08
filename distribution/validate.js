const sourceLogic = require('../airbyte/source/sourceLogic')
const destinationLogic = require('../airbyte/destination/destinationLogic')
// const configInfo = require('../config/connectConfig')
// const uuidv1 = require('uuid/v1')

module.exports = {validateSource, validateDestination}

async function validateSource(sourceInfo){
    
    var delSource = true

    console.log("Start validationSource")
    var sourceValidate = await sourceLogic.validateLogic(sourceInfo, delSource)
    // console.log("source validateLogic return: ", sourceValidate)
    if (sourceValidate == true) {
        console.log("validation suceess")
        return true
    }

}

async function validateDestination(destinationInfo){
    var delDestination = true
    console.log("Start validateDestination")
    var destinationLogicReturn = await destinationLogic.destinationLogic(destinationInfo, delDestination)
    console.log("destinationLogic return: ", destinationLogicReturn)
    if (destinationLogicReturn != null){
        console.log("validate distribution failed")
        return null
    }
    console.log("validate distribution is successful")
    return true


}
