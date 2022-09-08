// active nav bar

console.log(window.location.pathname)
console.log(document.querySelectorAll('.nav_link'))
const  active_page =window.location.pathname

const nav_links = document.querySelectorAll('.nav_link').forEach(link => {if(link.href.includes(`${active_page}`))
    {
        link.classList.add('active')
    }})



// geo location

    function get_geo_location()
{
    if(navigator.geolocation)
    {
        console.log("geting geo");
        console.log(navigator.geolocation);
        navigator.geolocation.getCurrentPosition(showPosition);
    }
}
    
function showPosition (position)
{
    var x  = document.getElementById('p');
    var y  = document.getElementById('BTN');
    x.innerHTML = "you are in <br>" +position.coords.latitude + "<br>" +position.coords.longitude;
}
