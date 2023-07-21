console.log("LOADED");

let deleteButton = document.querySelectorAll("button[class=delete]");
console.log(deleteButton);
deleteButton[0].addEventListener("click", (event) => {
  let checkedBoxes = document.querySelectorAll('input[type=checkbox]:checked');
  let list = [];
  checkedBoxes.forEach(box => list.push(box.id));

  console.log("SENDING: "+list);

  const listName = document.getElementById("titleElement").innerHTML
  let url = `http://localhost:3000/delete-item/${listName}`;
  console.log(url);
  let req = {
    method: "POST",
    body: JSON.stringify({selected:list}),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  }
  console.log(req);
  fetch(url, req).then((res) => {
    location.reload();
  });
});
