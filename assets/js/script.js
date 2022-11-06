// const sidebar = document.querySelector('#offcanvasNavbar');
// const localBtn = document.querySelector('#searchBrewBtn');
// const resultsTable = document.querySelector('#tableBrew');

// function granted(usrPos) {
//   const position = usrPos.coords;
//   const usrLatitude = position.latitude;
//   const usrLongitude = position.longitude;
//   console.log('access granted');
//   return [usrLatitude, usrLongitude]
// }

// function denied() {
//   console.log('access denied');
//   return false
// }

// localBtn.addEventListener('click', function (event) {
//   event.preventDefault();
//   console.log('Clicked');
//   let beerPosition = navigator.geolocation.getCurrentPosition(granted, denied);

//   console.log(beerPosition);
//   if (beerPosition === false) {
//     console.log("Can't find beer")
//     return
//   } else {
//     console.log('Second Click');
//   }


// });


// var myHeaders = new Headers();
// myHeaders.append("Authorization", "Bearer d-Zk9Nv2t5lmfuhdEBns4h0UgeAFRUV3-eubcRfjSaPKo5aFhZSi_8qfL7xtTsYghIBiwSmEvaA-yZ0L83ac-wgfOQST-XQqCJ0D7QCKPosrrFnLQu0rL0iK9TVjY3Yx");

// var requestOptions = {
//   method: 'GET',
//   headers: myHeaders,
//   redirect: 'follow'
// };

// fetch("https://api.yelp.com/v3/businesses/search?categories=breweries&location=san diego", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));



$(window).on('load', function () {
  $('#modal').modal('show');
});
