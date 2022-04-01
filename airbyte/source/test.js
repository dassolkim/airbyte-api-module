const sourceLogic = require('./sourceLogic')

async function testSource(delSource){
    
    try{
        console.time('api call during time')
        const source = await sourceLogic.createSource()
        // console.log(source)
        let sourceId
        let catalog
        if (source != null){
            sourceId = source.sourceId
            console.log("sourceId: ", sourceId)
            const getSourceResult = await sourceLogic.getSource(sourceId)
            console.log(getSourceResult)
            console.log("source lookup is done")
        } else { console.log("get source api does not work")}
        if (getSourceResult != null){
            const discoverResult = await sourceLogic.discoverSchema(sourceId)
            catalog = discoverResult.catalog
            console.log(JSON.stringify(catalog, null, 2))
            console.log("source validation is done")
        } else { console.log("discover_schema does not work")}
        if (discoverResult != null && delSource == true){
            const deleteSourceResult = await sourceLogic.deleteSource(sourceId)
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

// var csvTestSourceId = "28ee4fe1-8cec-4a33-822b-83cbda871ec0"
// var dbTestSourceId = "614e3799-a0b1-4018-9ab9-44b425b13153"
/**
var dbTestSourceId = "51c84494-c237-4238-81e2-b37912cb1f87"
async function test_discover(sourceId){
    var result = await sourceLogic.discoverSchema(sourceId)
    var catalog = result.catalog
    console.log("This is catalog: ", catalog)
    if(result != null){
        for (var obj in catalog){
            for(var key in catalog[obj]){
                for(var val in catalog[obj][key]){
                    console.log(key, val)
                    console.log(catalog[obj][key][val]) 
                    // data.streams[key][stream] = catalog[obj][key][val]
                    if(val == "stream"){
                        data.streams[key][stream] = catalog[obj][key][val]
                    } else if(val == "config"){
                        data.streams[key][config] = catalog[obj][key][val]
                    }
                }
            }
        }
        console.log("This is data: ", data)
        console.log("It's complete")
    }
}
**/

// test_discover(dbTestSourceId)

testSource(true)