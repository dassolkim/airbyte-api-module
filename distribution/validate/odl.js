const sourceLogic = require('../../airbyte/source/sourceLogic')

module.exports = { validate }

async function validate(sourceInfo) {
    
    const sourceId = await sourceLogic.odlValidateLogic(sourceInfo)
    // console.log("sourceLogic return: ", source)
    if (sourceId == null) {
        console.log("source/OpenDataLakeLogic failed")
        return null
    }
    return sourceId
   
}