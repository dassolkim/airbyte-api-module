const sourceLogic = require('./sourceLogic')

async function testSource(delSource){
    
    try{
        console.time('api call during time')
        var source = await sourceLogic.createSource()
        // console.log(source)
        if (source != null){
            var sourceId = source.sourceId
            console.log("sourceId: ", sourceId)
            var getSourceResult = await sourceLogic.getSource(sourceId)
            console.log(getSourceResult)
            console.log("source lookup is done")
        } else { console.log("get source api does not work")}
        if (getSourceResult != null){
            var discoverResult = await sourceLogic.discoverSchema(sourceId)
            var catalog = discoverResult.catalog
            console.log(JSON.stringify(catalog, null, 2))
            console.log("source validation is done")
        } else { console.log("discover_schema does not work")}
        if (discoverResult != null && delSource == true){
            var deleteSourceResult = await sourceLogic.deleteSource(sourceId)
            console.log(deleteSourceResult)
            console.log("source deletion is done")
        } else { console.log("delete source api does not work")}
        console.timeEnd('api call during time')
        if (delSource != true){
            return sourceId
        }
        else {
            return catalog
        }
    } catch (error) {
        console.log(error)
    }
}

/* 
var testSourceId = "28ee4fe1-8cec-4a33-822b-83cbda871ec0"
async function test_get(sourceId){
    var result = await sourceLogic.getSource(sourceId)
    console.log("test Result: ", result)
    if(result != null){
        console.log("It's complete")
    }
}
test_get(testSourceId)
*/

testSource(true)