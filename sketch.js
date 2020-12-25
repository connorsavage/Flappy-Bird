const NUMBER_OF_PIPES = 3
let grass
let score = 3

class Bird {
  constructor() {
    this.x = 100
    this.y = 50
    this.dia = 30
    this.velocity = 0
    this.gravity = 0.4
    this.lift = 10
  }

  drawBird() {
    fill('yellow')
    circle(this.x, this.y, this.dia)
    fill('red')
    triangle(this.x + 10, this.y - 5, this.x + 10, this.y + 5, this.x + 20, this.y)
    fill('white')
    circle(this.x + 7, this.y - 8, this.dia - 17)
    fill('black')
    circle(this.x + 10, this.y - 8, this.dia - 27)
    fill('yellow')
    ellipse(this.x - 10, this.y + 2, 20, 12)
  }

  moveDown() {
    this.y += this.velocity
    this.velocity += this.gravity
    if (this.y >= grass)
      this.velocity = 0
    else if (this.y <= 0)
      this.velocity = 0 + this.gravity
  }
  
  moveUp() {
    this.velocity -= this.lift
    //console.log("imovedup")
  }
}

function keyPressed() {
  if (key == ' ') {
    bird.moveUp()
  }
}

class Pipe {
  constructor(x) {
    this.x = x
    this.y = 0
    this.width = 100
    this.height = random(50, 300)
    this.hit = false
  }

  draw() {
    if (this.collide()) {
      if (!(this.hit)) {
        this.hit = true
        score -= 1
      }
    }
    fill(this.collide() ? 'red' : 'green')
    rect(this.x, this.y, this.width, this.height)
    rect(this.x - 10, this.height - 40, this.width + 20, 40)
    rect(this.x, this.height + 150, this.width, grass - this.height - 150)
    rect(this.x - 10, this.height + 150, this.width + 20, 40)

  }
  move() {
    this.x -= 3
    if (this.x < -this.width) {
      this.x = width
      this.height = random(50, 300)
      this.hit = false
    }
  }

  collide() {
    return collideRectCircle(this.x, this.y, this.width, this.height, bird.x, bird.y, bird.dia) || collideRectCircle(this.x, this.height + 150, this.width, grass - (this.height + 150), bird.x, bird.y, bird.dia)
  }
}

function gameOver() {
  background(150)
  textAlign(CENTER);
  textSize(64)
  fill("red")
  text('GAME OVER', width / 2, height / 2)
}

function drawGrass() {
  fill('lightgreen')
  rect(0, grass, width, grassHeight)
  fill('burlywood')
  rect(0, dirt, width, grassHeight)
}

let bird = new Bird()
let pipes = []

function setup() {
  createCanvas(800, 600);
  grass = height * 5 / 6
  grassHeight = 100
  dirt = height * 6 / 7
  while (pipes.length < NUMBER_OF_PIPES) {
    pipes.push(new Pipe((width + 100) * (pipes.length + 3) / NUMBER_OF_PIPES))
  }
}

function draw() {
  background('skyblue');
  drawGrass()
  for (let Pipe of pipes) {
    Pipe.draw()
    Pipe.move()
  }
  bird.drawBird()
  bird.moveDown()
  textAlign(RIGHT)
  textSize(32)
  fill('red')
  text("Lives remaining: "+ score, width - 50, 100)
  if (score <= 0) {
    gameOver()
    noLoop()
  }
}
