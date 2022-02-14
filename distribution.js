const sourceLogic = require('./sourceLogic')
const destinationLogic = require('./destinationLogic')
const uuidv1 = require('uuid/v1')

// get datasetId from SODAS+
const datasetId = uuidv1()
console.log("datasetId: ", datasetId)

async function main(){
    
    var delSource = false
    var delDestination = false

    console.log("Start sourceLogic")
    var discoverLogicReturn = await sourceLogic.discoverLogic(delSource)
    console.log("sourceLogic return: ", discoverLogicReturn)

    // test multi module.exports
    /** var discoverLogicReturn = await sourceLogic.discoverLogic(delSource)
    console.log("sourceLogic return: ", discoverLogicReturn)
    if (discoverLogicReturn != null && delSource == false) {
        var getSourceReturn = await sourceLogic.getSource(discoverLogicReturn)
        var getSourceId = getSourceReturn.sourceId
        console.log("This result is getSource() return : ", getSourceReturn)
    
    sourceLogic.deleteSource(getSourceId)
    **/     

    // right delSource is false
    if (discoverLogicReturn != null && delSource == false){
        console.log("Start destinationLogic")
        var destinationLogicReturn = await destinationLogic(delDestination)
        console.log("destinationLogic return: ", destinationLogicReturn)
    }
    
}
if (require.main == module){
    main()
}