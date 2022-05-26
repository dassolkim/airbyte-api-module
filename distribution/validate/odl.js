const sourceLogic = require('../../airbyte/source/sourceLogic')

module.exports = { validateWithDiscover, validateWithoutDiscover }

async function validateWithDiscover(sourceInfo) {
    
    const sourceId = await sourceLogic.odlValidatewithDiscover(sourceInfo)
    // console.log("sourceLogic return: ", source)
    if (sourceId == null) {
        console.log("source/OpenDataLakeLogic failed")
        return null
    }
    return sourceId
   
}

async function validateWithoutDiscover(sourceInfo) {
    
    const sourceId = await sourceLogic.odlValidatewithoutDiscover(sourceInfo)
    // console.log("sourceLogic return: ", source)
    if (sourceId == null) {
        console.log("source/OpenDataLakeLogic failed")
        return null
    }
    return sourceId
   
}