let app = new PIXI.Application(400, 622);
document.getElementById('pixiapp').appendChild(app.view);

// create a Background from an image path
let background = PIXI.Sprite.from('https://s3.us-east-2.amazonaws.com/morganfeir/images/background.png');
background.width = app.screen.width;
background.height = app.screen.height;
app.stage.addChild(background);

// create a new Sprite from an image path
const flowerOne = PIXI.Sprite.from('https://s3.us-east-2.amazonaws.com/morganfeir/images/flower_one.png')

let flowerOneAnimationConfig = {
    flowerOneSpeed: 0.6,
    flowerOneSpriteRotation: 2.25,
    flowerOneAnchorX: 0.892, 
    flowerOneAnchorY: 0.834,
    flowerOneInitialX: app.screen.width * (206/360),
    flowerOneInitialY: app.screen.height * (29/100),
    flowerOneScale: 0.5
}

// create a new Sprite from an image path
const flowerTwo = PIXI.Sprite.from('https://s3.us-east-2.amazonaws.com/morganfeir/images/flower_two.png')

let flowerTwoAnimationConfig = {
    flowerTwoSpeed: 0.6,
    flowerTwoSpriteRotation: 2.25,
    flowerTwoAnchorX: 0.15,
    flowerTwoAnchorY: 0.87,
    flowerTwoInitialX: app.screen.width * (42/100),
    flowerTwoInitialY: app.screen.height * (68/100),
    flowerTwoScale: 0.5
}

// center the sprite's anchor point
flowerOne.anchor.set(flowerOneAnimationConfig.flowerOneAnchorX, flowerOneAnimationConfig.flowerOneAnchorY);

// center the sprite's anchor point
flowerTwo.anchor.set(flowerTwoAnimationConfig.flowerTwoAnchorX, flowerTwoAnimationConfig.flowerTwoAnchorY);

// move the sprite to the center of the screen
flowerOne.x = flowerOneAnimationConfig.flowerOneInitialX;
flowerOne.y = flowerOneAnimationConfig.flowerOneInitialY;
flowerOne.scale.x *= flowerOneAnimationConfig.flowerOneScale;
flowerOne.scale.y *= flowerOneAnimationConfig.flowerOneScale;

app.stage.addChild(flowerOne);

// move the sprite to the center of the screen
flowerTwo.x = flowerTwoAnimationConfig.flowerTwoInitialX;
flowerTwo.y = flowerTwoAnimationConfig.flowerTwoInitialY;
flowerTwo.scale.x *= flowerTwoAnimationConfig.flowerTwoScale;
flowerTwo.scale.y *= flowerTwoAnimationConfig.flowerTwoScale;

app.stage.addChild(flowerTwo);
let time=0

// animate the tulip blooms with a sine function
app.ticker.add(function(delta) {
    time+= 0.015 * delta
    flowerOne.rotation = (1/4) + (1/2) * Math.sin(time)
    flowerTwo.rotation = (-1/4) + (1/2) * Math.cos(time)
});