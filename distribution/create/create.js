const sourceLogic = require('../../airbyte/source/sourceLogic')
const destinationLogic = require('../../airbyte/destination/destinationLogic')
const connectionLogic = require('../../airbyte/connection/connectionLogic')
// const configInfo = require('../config/connectConfig')
// const uuidv1 = require('uuid/v1')

module.exports = {create, choice, createCustom}

async function create(sourceInfo, destinationInfo, connectionInfo, catalog){
    // console.log("Start sourceLogic")
    console.time("distribution/create api call during time")
    const source = await sourceLogic.createLogic(sourceInfo)
    // console.log("sourceLogic return: ", source)
    if (source == null){
        console.log("source/createLogic failed")
        return false
    }
    // console.log("Start destinationLogic")
    const destination = await destinationLogic.createLogic(destinationInfo)
    // console.log("destinationLogic return: ", destination)
    if (destination == null){
        console.log("destination/createLogic failed")
        return false
    }
    // let syncCatalog
    // if (sourceInfo.sourceType == 'file'){
    //     syncCatalog = catalog
    // } else {
    //     syncCatalog = choice()
    // }
    const connection = {
        sourceId: source,
        syncCatalog: catalog
    }
    // const connection = source
    connection.destinationId = destination
    connection.status = connectionInfo.status
    connection.operationIds = [connectionInfo.operationId]
    const sync = connectionInfo.sync
    const url = connectionInfo.defaultUrl
    console.log("start connection logic (create and sync)")
    const connectionLogicReturn = await connectionLogic.createLogic(url, connection, sync)
    console.timeEnd("distribution/create api call during time")
    if (connectionLogicReturn == true){
        console.log("connection/createLogic succeeded")
        return true
    } else {
        console.log("connection/createLogic failed")
        return false
    }
}

async function choice(data, drop){

    const choiceData = data
    console.log('choice logic start')
    const count = Object.keys(choiceData.streams).length;
    console.log("Number of Tables: ", count)
    console.log("drop table list: ", drop)

    let i = 0
    while(i<count){
        console.log(choiceData.streams[i].stream.name)
        if(drop.includes(choiceData.streams[i].stream.name) == true){
            choiceData.streams[i] = null
            // delete choiceData.streams[i]
            // Object.keys(temp).forEach(function(key){
            //     delete temp[key];
            // })
            console.log("drop table!")
        }
        i++
    }
    /**
     * reassign object
     */
    let j = 0
    let a = 0
    const newCatalog = {
        streams: []
    }
    while(j<count){
        // var temp = choiceData.streams[j]
        if(choiceData.streams[j] != null){
            newCatalog.streams[a] = choiceData.streams[j]
            a++
        }
        j++
    }
    console.log(newCatalog)
    // source.syncCatalog = newData
    return newCatalog
}

async function createCustom(sourceInfo, destinationInfo, connectionInfo, catalog){
    // console.log("Start sourceLogic")
    console.time("distribution/create api call during time")
    const source = await sourceLogic.createLogic(sourceInfo)
    // console.log("sourceLogic return: ", source)
    if (source == null){
        console.log("source/createLogic failed")
        return false
    }
    let destination
    if(destinationInfo.exist == true){
        destination = destinationInfo.destinationId
    } else{
        destination = await destinationLogic.createLogic(destinationInfo)
        // console.log("destinationLogic return: ", destination)
        if (destination == null){
            console.log("destination/createLogic failed")
            return false
        }
    }
    
    // let syncCatalog
    // if (sourceInfo.sourceType == 'file'){
    //     syncCatalog = catalog
    // } else {
    //     syncCatalog = choice()
    // }
    const connection = {
        sourceId: source,
        syncCatalog: catalog
    }
    // const connection = source
    connection.destinationId = destination
    connection.status = connectionInfo.status
    connection.operationIds = [connectionInfo.operationId]
    const sync = connectionInfo.sync
    const url = connectionInfo.defaultUrl
    console.log("start connection logic (create and sync)")
    const connectionLogicReturn = await connectionLogic.createLogic(url, connection, sync)
    console.timeEnd("distribution/create api call during time")
    if (connectionLogicReturn == true){
        console.log("connection/createLogic succeeded")
        return true
    } else {
        console.log("connection/createLogic failed")
        return false
    }
}