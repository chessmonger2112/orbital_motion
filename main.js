var inverseSqr = document.getElementById("invSqr");
var inverseLine = document.getElementById("invLine");
var line = document.getElementById("line");
var canvas = document.getElementById("c");
context = canvas.getContext("2d");
var rCounter = document.getElementById('boldStuff2');
var pCounter = document.getElementById('periLabel');
var aCounter = document.getElementById('apoaLabel');
var dCounter = document.getElementById('difLabel');
// var eCounter = document.getElementById('eLabel');
var gInput = document.getElementById("currentG");
var planet = {x:450, y:150, vx:22.5, vy:0};
var gravityWell = {x:300, y:300};
var PI = Math.PI;
var apoapsis = null;
var periapsis = null;
var G = 1000;
var stop = true;
var userSelect = null;
var planetColor = "brown";
var sunColor = "yellow";
var space = "black";


function rat()
{
  for(var i = 0; i < changeForces.length; i++)
  {
    changeForces[i].style.display = "none";
  }
}
var changeForces = document.getElementsByClassName("force");
for(var i = 0; i < changeForces.length; i++)
{
  changeForces[i].addEventListener("click",rat,false);
}
console.log("change forces is ",changeForces);



context.rect(0,0,c.width,c.height);
context.fillStyle = space;
context.fill();

context.beginPath();
context.arc(planet.x,planet.y,10,0,2 * PI);
context.closePath();
context.fillStyle = planetColor;
context.fill();

context.beginPath();
context.arc(gravityWell.x,gravityWell.y,10,0,2 * PI);
context.closePath();
context.fillStyle = sunColor;
context.fill();

function animate()
{
  if(stop != true)
  {
    context.clearRect(0, 0, canvas.width, canvas.height);
    var x = planet.x;
    var y = planet.y;
    var gx = gravityWell.x;
    var gy = gravityWell.y;

    context.rect(0,0,c.width,c.height);
    context.fillStyle = space;
    context.fill();

    context.beginPath();
    context.arc(x,y,10,0,2 * PI);
    context.fillStyle = planetColor;
    context.fill();

    context.beginPath();
    context.arc(gx,gy,10,0,2 * PI);
    context.closePath();
    context.fillStyle = sunColor;
    context.fill();

    var deltaX = x - gx;
    var deltaY = y - gy;

    if (deltaX != 0)
    {
        var theta = Math.atan(deltaY / deltaX);
    }

    var x2 = deltaX * deltaX;
    var y2 = deltaY * deltaY;
    var r = Math.sqrt(x2 + y2)
    var r2 = r * r;
    var mult = deltaX / Math.abs(deltaX);

    var inverseSquare = -G / r2;
    var inverseLinear =  -G / r;
    var linear = -G * r;
    var forceArray = [inverseSquare,inverseLinear,linear];

    if (userSelect === null)
    {
        var F = mult * forceArray[1];
    }
    else
    {
        var F = mult * forceArray[userSelect];
    }

    var cosT = Math.cos(theta);
    var sinT = Math.sin(theta);

    planet.vx += F * cosT;
    planet.vy += F * sinT;
    planet.x += planet.vx;
    planet.y += planet.vy;

    rCounter.innerHTML = Math.round(100 * r) / 100;

    if (periapsis === null||(r > periapsis))
    {
        periapsis = r;
    }
    if (apoapsis === null||(r < apoapsis))
    {
        apoapsis = r;
    }
    // computing and displaying values for the screen
    var vx2 = planet.vx * planet.vx;
    var vy2 = planet.vy * planet.vy;
    var kEnery = .5 * (vx2 + vy2);
    var pEnergy = -G / r;

    pCounter.innerHTML = Math.round(100 * periapsis) / 100;
    aCounter.innerHTML = Math.round(100 * apoapsis) / 100;
    dCounter.innerHTML = Math.round(100 * (periapsis - apoapsis)) / 100;
    // eCounter.innerHTML = Math.round(100 * (kEnery + pEnergy)) / 100;
  }
}
var interval = setInterval(animate, 1000 / 2000);
inverseSqr.addEventListener('click', function(){
  userSelect = 0;
  planet.vx = 2;
  stop=false;}, false);
inverseLine.addEventListener('click', function(){userSelect = 1;
  stop = false;}, false);
line.addEventListener('click', function(){userSelect = 2;}, false);
buttonG.addEventListener('click', function(){G = Number(gInput.value);}, false);
c.addEventListener('click', function(){stop = !stop;}, false);
