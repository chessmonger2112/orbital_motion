var inverseSqr = document.getElementById("invSqr");
        var inverseLine = document.getElementById("invLine");
        var line = document.getElementById("line");
        var canvas = document.getElementById("c");
        context = canvas.getContext("2d");
        var rCounter = document.getElementById('boldStuff2');
        var pCounter = document.getElementById('periLabel');
        var aCounter = document.getElementById('apoaLabel');
        var dCounter = document.getElementById('difLabel');
        var eCounter = document.getElementById('eLabel');
        var gInput = document.getElementById("currentG");
        var obj = {x:450, y:150, vx:22.5, vy:0};
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

        context.rect(0,0,c.width,c.height);
        context.fillStyle = space;
        context.fill();

        context.beginPath();
        context.arc(obj.x,obj.y,10,0,2 * PI);
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
                var x = obj.x;
                var y = obj.y;
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
                var defaultF = inverseSquare;

                if (userSelect === null)
                {
                    var F = -mult * G /( 1*r2);
                }
                else
                {
                    var F = mult * forceArray[userSelect];
                }

                var cosT = Math.cos(theta);
                var sinT = Math.sin(theta);

                obj.vx += F * cosT;
                obj.vy += F * sinT;
                obj.x += obj.vx;
                obj.y += obj.vy;

                rCounter.innerHTML = Math.round(100 * r) /100;

                if (periapsis === null||(r > periapsis))
                {
                    periapsis = r;
                }
                if (apoapsis === null||(r < apoapsis))
                {
                    apoapsis = r;
                }

                var vx2 = obj.vx * obj.vx;
                var vy2 = obj.vy * obj.vy;
                var kEnery = .5 * (vx2 + vy2);
                var pEnergy = + -G / r;

                pCounter.innerHTML = Math.round(100 * periapsis) / 100;
                aCounter.innerHTML = Math.round(100 * apoapsis) / 100;
                dCounter.innerHTML = Math.round(100 * (periapsis - apoapsis)) / 100;
                eCounter.innerHTML = Math.round(100 * (kEnery + pEnergy)) / 100;
            }
        }
        var interval = setInterval(animate, 1000 / 2000)

        inverseSqr.addEventListener('click', function(){userSelect = 0;}, false);
        inverseLine.addEventListener('click', function(){userSelect = 1;}, false);
        line.addEventListener('click', function(){userSelect = 2;}, false);
        buttonG.addEventListener('click', function(){G = Number(gInput.value);}, false);
        c.addEventListener('click', function(){stop = !stop;}, false);
