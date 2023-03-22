console.log("javascript is linked")

let button = document.getElementById("submitButton");











//console.log(navigator.geolocation.getCurrentPosition(data => console.log(data)))
//let lat = navigator.geolocation.getCurrentPosition(data => console.log(data)).coords.latitude
//let lon = navigator.geolocation.getCurrentPosition(data => console.log(data)).coords.longitude
//console.log(lat,lon)
/*async function getCoordinates() {
    await let lat = await navigator.geolocation.getCurrentPosition(() => console.log('success'))
    //let lon = await navigator.geolocation.getCurrentPosition(data => console.log(data)).coords.longitude
    console.log(lat,lon)
}
getCoordinates()*/
/*
function getLocation() {
    if (navigator.geolocation) {
        let userPosition = navigator.geolocation.getCurrentPosition(showPosition);
    } 
    else {
        alert("Geolocation is not supported by this browser.");
    }
    return [userPosition.position.coords.latitude,userPosition.position.coords.longitude]
}

function showPosition(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
}
*/


async function getLocation(){
	const pos = await new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject, options = {enableHighAccuracy:true})
	});
	return [pos.coords.latitude, pos.coords.longitude]
}
//let locationArray = getLocation()
//console.log(getLocation())
//console.log(lat,lon)



async function render() {
    let locationArray = await getLocation()
    console.log(getLocation())
    var map = L.map('map').setView([locationArray[0], locationArray[1]], 13);
    
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    var marker = L.marker([locationArray[0], locationArray[1]]).addTo(map);
    marker.bindTooltip("You are here",{permanent:true})
    return locationArray
}

//let userLocation = render()

async function foursquarePull(lat,lon) {
    const options = {method: 'GET', headers: {accept: 'application/json', Authorization: 'fsq3ATzZbmcGhdeFafr73wZcnJ+LlN6bK+4dh19a7ClS4u8='}};

    let businessData = await fetch(`https://api.foursquare.com/v3/places/search?query=coffee&ll=${lat}%2C${lon}&radius=2000&limit=5`, options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));
    return businessData
}

//console.log(foursquarePull())


async function master () {
    let userLocation = await render()
    await console.log("at this point the userlocation should be there")
    await console.log(userLocation)
    await console.log(userLocation[0],userLocation[1])
    let businesses = await foursquarePull(userLocation[0],userLocation[1]).results
    setTimeout(console.log(businesses[0].fsq_id),20000)
    //console.log(businesses.fsq_id)
}
master()

//var map = L.map('map').setView([locationArray[0], locationArray[1]], 13);
/*var map = L.map('map', {
    center: [51.505, -0.09],
    zoom: 13
});*/



/*
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);*/


//var marker = L.marker([51.5, -0.09]).addTo(map);