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


async function render() {
    let locationArray = await getLocation()
    console.log(getLocation())
    /*
    var map = L.map('map').setView([locationArray[0], locationArray[1]], 13);
    
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    var marker = L.marker([locationArray[0], locationArray[1]]).addTo(map);
    marker.bindTooltip("You are here",{permanent:true})
    */
    return locationArray
}



async function foursquarePull(lat,lon,busType) {
    const options = {method: 'GET', headers: {accept: 'application/json', Authorization: 'fsq3ATzZbmcGhdeFafr73wZcnJ+LlN6bK+4dh19a7ClS4u8='}};

    let businessData = await fetch(`https://api.foursquare.com/v3/places/search?query=${busType}&ll=${lat}%2C${lon}&radius=2000&limit=5`, options)
      //.then(response => response.json())
      //.then(response => console.log(response))
      .catch(err => console.error(err));
    let data = await businessData.text()
    console.log("data:",data)
	let parsedData = JSON.parse(data)
    console.log("parsedData:",parsedData)
    let businesses = parsedData.results
    console.log("businesses:",businesses)
    return businesses
}




async function master () {
    let userLocation = await render()
    var map = L.map('map').setView([userLocation[0], userLocation[1]], 13);
    
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    var marker = L.marker([userLocation[0], userLocation[1]]).addTo(map);
    marker.bindTooltip("You are here",{permanent:true})
    //await console.log("at this point the userlocation should be there")
    //await console.log(userLocation)
    //await console.log(userLocation[0],userLocation[1])
    
    //console.log(businesses.fsq_id)
    return {userLocation,map}
}


async function searchForBusinesses(userBusinessSelection, userLocation,map) {
    let businesses = await foursquarePull(userLocation[0],userLocation[1],userBusinessSelection)//.results
    //console.log(businesses[0].fsq_id)
    businesses.forEach((business) => {
        var marker = L.marker([business.geocodes.main.latitude, business.geocodes.main.longitude]).addTo(map);
        marker.bindTooltip(business.name,{permanent:true})
        console.log(business.name)
        console.log(business.geocodes.main.latitude,business.geocodes.main.longitude)
    })
}

async function main() {
    let {userLocation,map} = await master()
    button.addEventListener('click', ()=> {
        let userSelection = document.querySelector("#businessType").value
        console.log(userSelection,userLocation)
        searchForBusinesses(userSelection, userLocation,map)
    })
}
main()


//console.log(foursquarePull())

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