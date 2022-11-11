$(window).on('load', function() {
  $('#modal').modal('show');
  bucketListRefresh();
});

function removeDuplicates(arr) {
  return arr.filter((item,index) => arr.indexOf(item) === index);
}

const addBrewery = function (name) {
  
  let storedBrews = []
    console.log(localStorage.storedBrews)
  
    if (localStorage.storedBrews == undefined) {
      storedBrews.push(name);
    } else {
      storedBrews = JSON.parse(localStorage.storedBrews);
      storedBrews.push(name);
    }
    storedBrews = removeDuplicates(storedBrews);
    console.log(storedBrews);
    localStorage["storedBrews"] = JSON.stringify(storedBrews)
  
    // let getBrews = 
    // console.log(localStorage.getBrews)
  
    // getBrews = JSON.parse(localStorage.storedBrews);
    // for (let i = 0; i < getBrews.length[i]; i++) {
    //   let element = getBrews[i];
    // }
    // window.onload = function () {
    //   const items = getFromLocalStorage();
    //   items.forEach((item) => {
    //    // do something with items.
    //   });

  //target the brew list "ul"
  bucketListRefresh();
};

const bucketListRefresh = function() {
  let ul = document.getElementById("brew-list");
  getBrews = JSON.parse(localStorage.storedBrews);
  //create a new li or list item toput inthe list
  for (let i = 0; i < getBrews.length; i++) {
    let li = document.createElement("li");
    //create a button to put in the new li you create
    let btn = document.createElement("button");
    //Add text to the new list item
    li.appendChild(document.createTextNode(getBrews[i]));
    //add classes to the newlist item, will basically be pulling in the bootstrap styles
    li.classList.add("list-group-item");
    //add text to the button in this case its just X
    btn.appendChild(document.createTextNode("X"));
    //add a function to the button
    btn.addEventListener("click", function () {
      //the function will target the parent "ul" of the parent "li" of the button and removes the li
      this.parentNode.parentNode.removeChild(this.parentNode);
      //get the text value of the brewery name that we want to delete
      // let deleteThis = ""
      // let storedBrewList = JSON.parse(localStorage.storedBrews);
      // let brewIndex = storedBrewList.indexOf(deleteThis)
      // storedBrewList.splice(brewIndex, 1);
    });
    li.appendChild(btn);
    //li.setAttribute("id", newBrewery); // added line
    ul.appendChild(li);
  }
  

};

const searchBrewery = function () {
  document.getElementById("tableBrew").setAttribute("class", "table");
  let searchTerm = document.getElementById("usrSearch").value;
  console.log(searchTerm)

  let SDfetchRequest

  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer d-Zk9Nv2t5lmfuhdEBns4h0UgeAFRUV3-eubcRfjSaPKo5aFhZSi_8qfL7xtTsYghIBiwSmEvaA-yZ0L83ac-wgfOQST-XQqCJ0D7QCKPosrrFnLQu0rL0iK9TVjY3Yx"
  );

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?&categories=breweries&location=san diego&term=${searchTerm}`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      SDfetchRequest = JSON.parse(result);
      console.log(SDfetchRequest.businesses);

      for (i = 0; i < SDfetchRequest.businesses.length; i++) {
          let business = SDfetchRequest.businesses[i];
          let busName = business.name;
        
          //select table body
          let brewBody = document.getElementById("brew-table-body");
          //create table row element for new brewery row
          let brewRow = document.createElement("tr");
          //create row column element for brewery name
          let brewName = document.createElement("td");
          //add text to the new column
          brewName.appendChild(document.createTextNode(business.name));
          brewRow.appendChild(brewName);

          let brewRating = document.createElement("td");
          brewRating.appendChild(document.createTextNode(business.rating));
          brewRow.appendChild(brewRating);

          let brewPrice = document.createElement("td");
          brewPrice.appendChild(document.createTextNode(business.price));
          brewRow.appendChild(brewPrice);
        
          let brewPhone = document.createElement("td");
          brewPhone.appendChild(document.createTextNode(business.phone));
          brewRow.appendChild(brewPhone);

          let brewURL = document.createElement("td");
          let brewLink = document.createElement("a");
          brewLink.setAttribute("href", business.url);
          brewLink.setAttribute("target", "_blank");
          brewLink.appendChild(document.createTextNode("Link"));
          brewURL.appendChild(brewLink);
          brewRow.appendChild(brewURL);
        
          //IMPORTANT PART
          //create a new column for this brewery row
          let brewButton = document.createElement("td");
          //add button to the row
          let btn = document.createElement("button");
          //adding the add function to the new button
          btn.addEventListener("click", function () {
            addBrewery(busName);
          });
          //add text value to the button
          btn.appendChild(document.createTextNode("Add"));
          //brewButton.appendChild(document.createTextNode(business.phone));
          brewButton.appendChild(btn);
          //add the button to the row
          brewRow.appendChild(brewButton);
        
          brewBody.appendChild(brewRow);
        }

    })
    .catch((error) => console.log("error", error));
};



