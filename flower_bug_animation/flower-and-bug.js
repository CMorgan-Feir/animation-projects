var app = new PIXI.Application(400, 622);
document.getElementById("pixiapp").appendChild(app.view);

// create a Background from an image path
var background = PIXI.Sprite.from("https://s3.us-east-2.amazonaws.com/morganfeir/images/flower-bg-small.png");
background.width = app.screen.width;
background.height = app.screen.height;
app.stage.addChild(background);

// create a new Sprite from an image path
var bug = PIXI.Sprite.from('https://s3.us-east-2.amazonaws.com/morganfeir/images/bug.png')

var animationConfig = {
    bugMinSpeed: 0.6,
    bugSpeedRange: 5,
    bugSpriteRotation: 2.25,
    bugDestinationThreshold: 20,
    bugAnchor: 0.5,
    bugInitialX: app.screen.width * (3/4),
    bugInitialY: app.screen.height / 2,
    bugScale: 0.1
}

// center the sprite's anchor point
bug.anchor.set(animationConfig.bugAnchor);

// move the sprite to the center of the screen
bug.x = animationConfig.bugInitialX;
bug.y = animationConfig.bugInitialY;
bug.scale.x *= animationConfig.bugScale;
bug.scale.y *= animationConfig.bugScale;

app.stage.addChild(bug);

//this function determines the movement of the bug with speed, angle and target position
function getNewBugPath() {

    var newPosition = {
        x: app.screen.width * Math.random(), 
        y: app.screen.height * Math.random()
    };

    var velocity = animationConfig.bugMinSpeed + Math.random() * animationConfig.bugSpeedRange

    var angle = Math.atan2(newPosition.y - bug.y, newPosition.x - bug.x);
    var vx = velocity * Math.cos(angle);
    var vy = velocity * Math.sin(angle);
    return {vx:vx, vy:vy, angle:angle, positionX:newPosition.x, positionY:newPosition.y}
}

var velocities = getNewBugPath()

//move bug and update path
app.ticker.add(function(delta) {
    //every second move the bug according to the velocities and angle
    bug.x += velocities.vx * delta
    bug.y += velocities.vy * delta
    bug.rotation =  velocities.angle + animationConfig.bugSpriteRotation
    // Determine if bug is close to target position, and change target position if so
    if (Math.abs(bug.x - velocities.positionX) < animationConfig.bugDestinationThreshold 
    && Math.abs(bug.y - velocities.positionY) < animationConfig.bugDestinationThreshold) {
        velocities = getNewBugPath()
    }
});
