$(window).on('load', function() {
  $('#modal').modal('show');
});

const addBrewery = function (name) {
  //target the brew list "ul"
  let ul = document.getElementById("brew-list");
  //create a new li or list item toput inthe list
  let li = document.createElement("li");
  //create a button to put in the new li you create
  let btn = document.createElement("button");
  //Add text to the new list item
  li.appendChild(document.createTextNode(name));
  //add classes to the newlist item, will basically be pulling in the bootstrap styles
  li.classList.add("list-group-item");
  //add text to the button in this case its just X
  btn.appendChild(document.createTextNode("X"));
  //add a function to the button
  btn.addEventListener("click", function () {
    //the function will target the parent "ul" of the parent "li" of the button and removes the li
    this.parentNode.parentNode.removeChild(this.parentNode);
  });
  li.appendChild(btn);
  //li.setAttribute("id", newBrewery); // added line
  ul.appendChild(li);
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
        
          let brewPhone = document.createElement("td");
          //add text to the new column
          brewPhone.appendChild(document.createTextNode(business.phone));
          brewRow.appendChild(brewPhone);
        
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

