export const dbUrl = "mongodb://127.0.0.1:27017";
export const clusterDBUrl = "mongodb+srv://adminUser9:test1234@cluster0.61z82hb.mongodb.net/"
export const dbName = "todoListDB";
import mongoose from "mongoose";

export const todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

export const ToDoModel = mongoose.model("ToDoItem", todoSchema);

export const listSchema = new mongoose.Schema({
    list: {
        type: String,
        required: true
    },
    items: [todoSchema]
});

export const ListModel = mongoose.model("List", listSchema);