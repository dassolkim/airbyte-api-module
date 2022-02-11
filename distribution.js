const sourceLogic = require('./sourceLogic.js')
const destinationLogic = require('./destinationLogic.js')
const uuidv1 = require('uuid/v1')

// get datasetId from SODAS+
// const datasetId = uuidv1()
// console.log("datasetId: ", datasetId)

async function main(){
    
    var delSource = true
    var delDestination = true

    console.log("Start sourceLogic")
    var sResult = await sourceLogic(delSource)
    console.log(sResult)
    // original value: false
    if (sResult != null && delSource == false){
        console.log("Start destinationLogic")
        var dResult = await destinationLogic(delDestination)
        console.log(dResult)
    }
}
if (require.main == module){
    main()
}