var options = {
        enableHighAccuracy: true,
        maximumAge: 0
    }
    let j = 0
    const fallbackLocation = { latitude: 48.8575, longitude: 2.2982}
    
    
    function success(pos) {
        console.log (pos)
    do_flickr(pos.coords);
    }
    function error(err) {
        console.log("Error");
    do_flickr(fallbackLocation);
    }
    
    navigator.geolocation.getCurrentPosition(success, error, options)
    
    
    function do_flickr(coords) {
    var url = 'https://shrouded-mountain-15003.herokuapp.com/'+
    'https://flickr.com/services/rest/?'+
    'api_key=4a3a21e6115724e9438255e8b25f83e7'+
    '&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&per_page=5&page=1:5'+
    'lat='+coords.latitude+
    '&lon='+coords.longitude+
    '&text=church';
    console.log(url);
    fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
    
    console.log(data);
    console.log(data.stat);
    
    console.log(JSON.stringify(data));
    
    let photos = data.photos;
    console.log(photos);
    
    let photo_arr = photos.photo;
    console.log(photo_arr)

    let pic = photo_arr[j];
    console.log(pic);
    display_pic(pic);

let page = document.getElementById("page")
page.addEventListener("click",Nextpage)

function Nextpage(event){
if (j < 5){
    j += 1;
  display_pic(photo_arr[j])
}
}
    })
    }
    
    
    function toHTML(url) {
            const image = document.createElement('img');
  
    image.width = 500;
    image.src = url;
            return image;
    }
    
    
    function display_pic(pic) {
    var imageUrl = constructImageURL(pic);     console.log(imageUrl);
    
    let dogImage = toHTML(imageUrl);
    document.getElementById("imagesDiv").appendChild(dogImage);
    }
    
    function constructImageURL (photoObj) {
        return "https://farm" + photoObj.farm +
                ".staticflickr.com/" + photoObj.server +
                "/" + photoObj.id + "_" + photoObj.secret + ".jpg";
    }
  
