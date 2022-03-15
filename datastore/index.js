const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

// var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  var id = counter.getNextUniqueId((err, id) => {
    var path = `${exports.dataDir}/${id}.txt`;
    fs.writeFile(path, text, (err) => {
      if (err) {
        throw ('error creating file');
      } else {
        callback(null, { id, text });
      }
    });
  });
};


exports.readAll = (callback) => {
  fs.readdir(exports.dataDir, (err, items) =>{
    if (err) {
      throw ('error reading all file');
    } else {
      var data = _.map(items, (filename) => {
        var id = filename.slice(0, 5);
        return filename = {id: id, text: id};
      });
      callback(null, data);
    }
  });
};


exports.readOne = (id, callback) => {
  // var text = items[id];
  var path = `${exports.dataDir}/${id}.txt`;
  fs.readFile(path, 'utf8', (err, fileData) => {
    if (err) {
      callback(new Error(`No item with id: ${id}`));
    } else {
      var message = { id, text: fileData };
      // console.log(message);
      callback(null, message);
    }
  });
};


exports.update = (id, text, callback) => {
  var path = `${exports.dataDir}/${id}.txt`;
  exports.readOne(id, (error, message) => {
    if (error) {
      callback(new Error(`No item with id: ${id}`));
    } else {
      fs.writeFile(path, text, (err) => {
        if (err) {
          callback(new Error(`No item with id: ${id}`));
        } else {
          callback(null, { id, text });
        }
      });
    }
  });
};

exports.delete = (id, callback) => {
  var path = `${exports.dataDir}/${id}.txt`;
  // var item = items[id];
  // delete items[id];
  // if (!item) {
  //   // report an error if item not found
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   callback();
  // }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
