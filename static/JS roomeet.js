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
    console.log("you are in <br>" +position.coords.latitude + "<br>" +position.coords.longitude);
}


function verify_form ()
{
  verifyPassword()
  verify_password_are_the_same()
  verifyage()
}


function verifyPassword() {  
    var pw = document.getElementById("Password").value;  
   
    if(pw.length < 8) {  
        alert("Password is too short"); 
        return false;  

    }  

  }  
  
function verify_password_are_the_same ()
{
    var pw = document.getElementById("Password").value;
    var pw2 = document.getElementById("Repeat_Password").value;
    if(pw!=pw2)
    {
        alert("Passwords do not match"); 
        return false;  
    }

}  
function verifyage() {  
    var age = document.getElementById("age").value;  
   
    if(age < 18) {  
        alert("User must be 18 years old"); 
        return false;  

    }  

  }  
 
