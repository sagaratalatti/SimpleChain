const level = require('level')
const chainDB = './chaindata';
const db = level(chainDB);


module.exports = {

  //Saving blocks to LevelDB
  addLevelDBBlock : (key, value) => {
    return new Promise(function (resolve, reject){
      db.put(key, value, function (error){
        if(error){
          reject(error);
        }
        resolve('Added block: ' + key);
        console.log('Added Block: ' + key);
      })
    })
  },

    //Getting blockchain height from levelDB
    getLevelBlockHeight : () => {
      return new Promise(function(resolve, reject){
        let height = -1;
        db.createReadStream()
          .on('data', function (data){
              height++;
          })
          .on('error', function (error){
              reject(error);
          })
          .on('close', function (){
            resolve(height);
          })
      })
    },

    //Getting blocks data from levelDB
    getLevelBlock : (key) => {
      return new Promise(function (resolve, reject){
        db.get(key, function (error, value){
          if(error)
            reject(error);
            resolve(JSON.parse(value));
        })
      })
    }
}