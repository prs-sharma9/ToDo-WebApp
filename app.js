import express from "express";
import bodyParser from "body-parser";
import * as DBUtils from "./ToDoItemsDBUtils.js";
import * as ListUtils from "./ListsDBUtils.js";
import _ from 'lodash';

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("resources"));

const _serverPort = 3000;
const defaultListName = "Home";

app.listen(_serverPort, (res) => {
    console.log(`server started at port: ${_serverPort}`);
    ListUtils.disconnectFromDB();
    ListUtils.connectToDb();
})

app.get("/", (req,res) => {
    res.redirect(`/${defaultListName}`);
})

app.post("/delete-item", (req, res) => {

    console.log(req.body.selected);

    if(DBUtils.deleteMultipleById(req.body.selected)) {
        res.redirect(`/${defaultListName}`);
    } else {
        res.send(
            "Error"
        )
    }
});

app.post("/add-item", (req, res) => {
    DBUtils.insertOne(req.body.addItem).then((result) => {
        console.log(result);
        res.redirect(`/${defaultListName}`);
    }).catch((error) => {
        console.log("ERROR while adding new item");
        console.log(error);
    })
    
}); 


app.get("/:lName", (req,res) => {
    
    const listName = _.lowerCase(req.params.lName);
    console.log(`Getting list: ${listName}`);
    let doesExist = ListUtils.findListByName(listName);
    doesExist
    .then((doc) => {
        if(doc){
            res.render('list', {
                displayName: listName,
                itemList: doc.items
              });
        } else {
            ListUtils.insertNewList(listName);
            res.redirect(`/${listName}`);
        }

    })
    .catch((err) => {
        console.log(err);
    });
})

app.post("/add-item/:lName", (req, res) => {
    const listName = _.lowerCase(req.params.lName);
    const itemToAdd = req.body.addItem;
    console.log("step1");
    ListUtils.insertItemInList(listName, itemToAdd)
    .then(() => {
        console.log("step5");
        res.redirect(`/${listName}`);
    })
    .catch((err) => console.log(err));
    
}); 

app.post("/delete-item/:lName", (req, res) => {

    const listName = _.lowerCase(req.params.lName);
    console.log("POST:DELETE: " + listName);

    console.log(req.body.selected);

    ListUtils.deleteMultipleIdsFromList(listName, req.body.selected)
    .then(() => res.redirect(`/${listName}`))
    .catch((err) => console.log(err));


});