const sourceLogic = require('./airbyte/source/sourceLogic')
const destinationLogic = require('./airbyte/destination/destinationLogic')
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

    // right delSource is false
    if (discoverLogicReturn != null && delSource == false){
        console.log("Start destinationLogic")
        var destinationLogicReturn = await destinationLogic.destinationLogic(delDestination)
        console.log("destinationLogic return: ", destinationLogicReturn)
    }
    
}
if (require.main == module){
    main()
}