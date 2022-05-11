const configInfo = require('../../../config/connectConfig')
const job = require('./jobLogic')

async function testGet() {

    const jobId = 469 //24
    // const defaultUrl = "114.70.235.40:18000"
    const get_result = await job.getJob(configInfo.defaultUrl, jobId)
    // const attemts = get_result.attemts
    const attempt = get_result.attempts[2].attempt
    const logs = get_result.attempts[2].logs

    // console.log(get_result)

    console.log(attempt)
    console.log(logs['logLines'])

}
testGet()

async function testDebug() {

    const jobId = 24 //2028
    // const defaultUrl = "114.70.235.40:18000"
    const get_result = await job.debugJob(configInfo.defaultUrl, jobId)
    // const attemts = get_result.attemts
    const attempt = get_result.attempts[0].attempt
    const logs = get_result.attempts[0].logs

    console.log(get_result)

    console.log(attempt)
    console.log(logs)

}
// testDebug()