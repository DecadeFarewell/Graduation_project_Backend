const dynamicDao = require('../Dao/dynamicDao');
const userDao = require('../Dao/userDao');

function getAlldynamic(page, pageSize, callback) {
    const promise = new Promise((resolve, reject) => {
        dynamicDao.getDynamicByPage(page, pageSize, resolve)
    })
    promise.then(result => {
        userDao.getPartInfoById(result.userID, callback)
    })
}

module.exports = {
    getAlldynamic
}
