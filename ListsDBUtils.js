import * as MongoUtils from "./DBSchemaUtils.js";
import mongoose from "mongoose";


export async function connectToDb() {
  try {
    await mongoose.connect(`${MongoUtils.clusterDBUrl}${MongoUtils.dbName}`);
  } catch(error) {
    console.error("ERROR:************" + error);
    return false;
  }
  return true;
}

export async function disconnectFromDB() {
  try{
    await mongoose.connection.close()
  } catch(error) {
    console.error("ERROR:************" + error);
    return false;
  }
  return true;
}

export async function findListByName(listName) {

  return MongoUtils.ListModel.findOne({list: listName}).exec();  
}

export async function insertNewList(listName) {
  
  await MongoUtils.ListModel.create({
    list: listName, 
    items: [{name: `DummyItem-${listName}`}]});
}


export function insertItemInList(listName, item) {
  console.log("insertItemInList: " + listName);
  const newItem = {
    name: item
  };
  return new Promise((resolve, reject) => {
    resolve(findListByName(listName)
    .then((doc) => {
      console.log("step2");
      
      doc.items.push(newItem);

      console.log("step3");
      doc.save()
      console.log("step4");
    })
    .catch(err => {
      console.log(err)
    }));
  });
  
}

export async function deleteMultipleIdsFromList(listName, ids) {
  console.log("deleteMultipleIdsFromList: " + listName);

  return new Promise((resolve, reject) => {
    resolve(findListByName(listName)
    .then((doc) => {
      // console.log(doc);
      // remove ids from doc.items list
      const newItems = doc.items.filter((item) => {
        let id = item._id.valueOf();
        return ids.findIndex(element => element === id) === -1;
      });
      doc.items = newItems;
    
      doc.save();
    })
    .catch(err => {
      console.log(err)
    }));
  })
  
}