function writeResponse(status,msg,data = undefined){
    return JSON.stringify({
        status,
        msg,
        data,
    })
}

module.exports = {
    writeResponse
}