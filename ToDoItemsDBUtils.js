import * as MongoUtils from "./DBSchemaUtils.js";
import mongoose from "mongoose";

export async function connectToDb() {
  try {
    await mongoose.connect(`${MongoUtils.dbUrl}/${MongoUtils.dbName}`);
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

export function findAll(listName = "Home") {
  let list = [];
  return MongoUtils.ToDoModel.find();
}

export function insertOne(name, listName = "Home") {
  const val = new MongoUtils.ToDoModel({
          name: name
      });
  return val.save();
}

export function deleteMultipleById(idList, listName = "Home") {
  MongoUtils.ToDoModel.deleteMany({_id: { $in: idList}})
    .then(function() {
        console.log("Deleted successfully!");
        return true;
    })
    .catch(function(err) {
        console.log(err);
        return false;
      });
}