const canvas = document.getElementById("header-canvas");
const ctx = canvas.getContext("2d");
canvas.width = canvas.getBoundingClientRect().width * 2
canvas.height = canvas.getBoundingClientRect().height * 2
let width = canvas.width
let height = canvas.height

/* WINDOW SIZING */
window.addEventListener('resize', function () {
    canvas.width = canvas.getBoundingClientRect().width * 2
    canvas.height = canvas.getBoundingClientRect().height * 2
    width = canvas.width
    height = canvas.height
    square.reset()
})

/* OBJECTS */
class squares {
    constructor() {
        if (squares.__instance) {
            return squares.__instance = this;
        } else {
            this.reset();
        }        
    }

    update() {
        this.pos.x += this.velocity * Math.sin(this.angle);
        this.pos.y += this.velocity * Math.cos(this.angle);
    
        if (this.pos.x - (this.size.width/2) <= 0) {
            this.angle = getBounceTrajectory(this.angle, 0)
            this.color = Math.round(Math.random() * 360);
        } else if (this.pos.x + (this.size.width/2) >= width) {
            this.angle = getBounceTrajectory(this.angle, 0)
            this.color = Math.round(Math.random() * 360);
        }
        if (this.pos.y - (this.size.height/2) <= 0) {
            this.angle = getBounceTrajectory(this.angle, Math.PI  * (3/2))
            this.color = Math.round(Math.random() * 360);
        } else if (this.pos.y + (this.size.height/2) >= height) {
            this.angle = getBounceTrajectory(this.angle, Math.PI * (3/2))
            this.color = Math.round(Math.random() * 360);
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.pos.x, this.pos.y);
    
        ctx.fillStyle = "hsl(" + this.color + ", 50%, 50%)";
        ctx.fillRect(-this.size.width/2, -this.size.height/2, this.size.width, this.size.height);
        ctx.fill();
    
        ctx.textAlign = "center";
        ctx.font = (this.size.width * 0.5) + "px Impact";
        ctx.fillStyle = "black";
        ctx.fillText("KC", 0, this.size.height/5, this.size.width);
        ctx.fill();
    
        ctx.restore();
    }

    reset() {
        this.pos = {
            x: width/2,
            y: height/2
        };
        this.velocity = Math.min(width, height) * 0.02;
        this.angle = Math.random() * (2 * Math.PI);
        this.size = {
            width: Math.min(width, height) * 0.3,
            height: Math.min(width, height) * 0.3
        }
        this.color = Math.round(Math.random() * 360);
    }
}

function update() {
    square.pos.x += square.velocity * Math.sin(square.angle);
    square.pos.y += square.velocity * Math.cos(square.angle);

    if (square.pos.x - (square.size.width/2) <= 0) {
        square.angle = getBounceTrajectory(square.angle, 0)
        square.color = Math.round(Math.random() * 360);
    } else if (square.pos.x + (square.size.width/2) >= width) {
        square.angle = getBounceTrajectory(square.angle, 0)
        square.color = Math.round(Math.random() * 360);
    }
    if (square.pos.y - (square.size.height/2) <= 0) {
        square.angle = getBounceTrajectory(square.angle, Math.PI  * (3/2))
        square.color = Math.round(Math.random() * 360);
    } else if (square.pos.y + (square.size.height/2) >= height) {
        square.angle = getBounceTrajectory(square.angle, Math.PI * (3/2))
        square.color = Math.round(Math.random() * 360);
    }   
}

function draw() {
    ctx.save();
    ctx.translate(square.pos.x, square.pos.y);

    ctx.fillStyle = "hsl(" + square.color + ", 50%, 50%)";
    ctx.fillRect(-square.size.width/2, -square.size.height/2, square.size.width, square.size.height);
    ctx.fill();

    ctx.textAlign = "center";
    ctx.font = (square.size.width * 0.01) + "px Impact";
    ctx.fillStyle = "white";
    ctx.fillText("㋡", 0, 0, square.size.width);
    ctx.fill();

    ctx.restore();
}

function loop() {
    ctx.clearRect(0, 0, width, height);

    square.update();
    square.draw();

    requestAnimationFrame(loop);
}
/* helper functions */
function getBounceTrajectory(incidentAngle, surfaceAngle) {
    let angle = surfaceAngle * 2 - incidentAngle;
    return angle >= (2*Math.PI) ? angle - (2*Math.PI) : angle < 0 ? angle + (2*Math.PI) : angle;
}

/* init */
const square = new squares;
requestAnimationFrame(loop);