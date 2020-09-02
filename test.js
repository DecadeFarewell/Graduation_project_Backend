const fs = require('fs')
const readStream = fs.createReadStream('C:/Users/admin/Desktop/Server/target/林俊杰 - 可惜没如果.kgma/林俊杰 - 可惜没如果.kgma_0');
readStream.on('data',data => {
    console.log(data)
})
readStream.on('end',() => {
    console.log('end')
})