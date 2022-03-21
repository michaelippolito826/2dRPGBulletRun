const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

// Event Listeners
addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
})

addEventListener('keydown', ({ key }) => {
  switch (key) {
    case 'a':
      keys.a.pressed = true
      break
    case 'd':
      keys.d.pressed = true
      break
    case ' ':
      projectiles.push(
        new Projectile({
        position: {
          x: player.position.x + player.width / 2,
          y: player.position.y
        },
        velocity: {
          x: 0,
          y: -10
        }
        })
      )
      break
  }
})

addEventListener('keyup', ({ key }) => {
  switch (key) {
    case 'a':
      keys.a.pressed = false
      break
    case 'd':
      keys.d.pressed = false
      break
    case ' ':
      break
  }
})

// Objects
class Player {
  constructor() {
    this.velocity = {
      x: 0,
      y: 0
    };
    this.rotation = 0
    const image = new Image();
    image.src = "https://img.icons8.com/ultraviolet/80/000000/double-tap.png";
    image.onload = () => {
      const scale = 2
      this.image = image
      this.width = image.width * scale
      this.height = image.height * 1.75
      this.position = {
        x: canvas.width / 2 - this.width / 2,
        y: canvas.height - this.height - 20
      }
    }
  }

  draw() {
    c.save()
    c.translate(player.position.x + player.width / 2, player.position.y + player.height / 2);
    c.rotate(this.rotation);
    c.translate(-player.position.x - player.width / 2, -player.position.y - player.height / 2);
    c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    c.restore()
  }

  update() {
    if (this.image) {
      this.draw()
      this.position.x += this.velocity.x
    }
  }
}

class Projectile {
  constructor({position, velocity}) {
    this.position = position
    this.velocity = velocity

    this.radius = 7
  }

  draw() {
    c.beginPath()
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
    c.fillStyle = 'red'
    c.fill()
    c.closePath()
  }

  update() {
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }
}

class EnemyAttacker {
  constructor(xLocation) {
    this.velocity = {
      x: 0,
      y: 0
    };
    const image = new Image();
    image.src = "https://img.icons8.com/ultraviolet/80/000000/flash-on.png";
    image.onload = () => {
      const scale = 2
      this.image = image
      this.width = image.width * scale
      this.height = image.height * 1.75
      this.position = {
        x: canvas.width * xLocation - this.width / 2,
        y: canvas.height * 0.2
      }
    }
  }

  draw() {
    c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
  }

  update({ velocity }) {
    if (this.image) {
      this.draw()
      this.position.y += velocity.y
    }
  }
}

class MultipleRandomAttackers {
  constructor() {
    this.position = {
      y: 0
    }
    this.velocity = {
      x: 0,
      y: 3
    }
    this.attackers = []
    let col = Math.floor(Math.random() * (4 - 3 + 1) + 3)

    const xArr = [0.1, 0.3, 0.5, 0.7, 0.9]
    let int = 5

    for (let i = 0; i < col; i++) {
      let rand = Math.floor(Math.random() * int);
      this.attackers.push(
        new EnemyAttacker(xArr[rand])
      )
      xArr.splice(rand, 1)
      int -= 1
      alert(int)
    }
  }

  update() {
    this.position.y += this.velocity.y
  }
}

function background() {
  let spacing = 1 / 5;
  let top = 0.2;
  let bot = 0.75;
  c.lineWidth = 5;

  //1
  c.beginPath();
  c.moveTo(c.canvas.width * spacing, c.canvas.height * top);
  c.lineTo(c.canvas.width * spacing, c.canvas.height * bot);
  c.stroke();

  //2
  c.beginPath();
  c.moveTo(c.canvas.width * spacing * 2, c.canvas.height * top);
  c.lineTo(c.canvas.width * spacing * 2, c.canvas.height * bot);
  c.stroke();

  //3
  c.beginPath();
  c.moveTo(c.canvas.width * spacing * 3, c.canvas.height * top);
  c.lineTo(c.canvas.width * spacing * 3, c.canvas.height * bot);
  c.stroke();

  //4
  c.beginPath();
  c.moveTo(c.canvas.width * spacing * 4, c.canvas.height * top);
  c.lineTo(c.canvas.width * spacing * 4, c.canvas.height * bot);
  c.stroke();
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.fillStyle = '#d1cfc8';
  c.fillRect(0, 0, canvas.width, canvas.height);
  background()
  player.update();

  projectiles.forEach((projectile, index) => {
    if (projectile.position.y + projectile.radius <= 0) {
      setTimeout(() => {
        projectiles.splice(index, 1)
      }, 0)
    } else {
      projectile.update()
    }
  })
  enemyAttackers.update()
  enemyAttackers.attackers.forEach((attacker) => {
    attacker.update({velocity: enemyAttackers.velocity})
  })

  if (keys.a.pressed && player.position.x > 0) {
    player.velocity.x = -20
    player.rotation = -0.15
  } else if (keys.d.pressed && player.position.x + player.width < canvas.width) {
    player.velocity.x = 20
    player.rotation = 0.15
  } else {
    player.velocity.x = 0
    player.rotation = 0
  }
}

// Init
const player = new Player()
const enemyAttackers = new MultipleRandomAttackers()
const projectiles = []
const keys = {
  a: {
    pressed: false
  },
  d: {
    pressed: false
  },
  space: {
    pressed: false
  }
}
try{
  animate();
}catch(e){alert(e.stack)}
