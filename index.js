window.onload = () => {
    let c = document.querySelector("#cnvs");
    c.width = window.innerWidth
    c.height = window.innerHeight

    //set configirations

    var config = {
         ball : {
             size : 5,
             color : "#ffff00",
             density : 200
         },
         lines : {
             color : "#000",
             distance : 150
         }
    }






    init(config)
}

function init(config) {
    let c = document.querySelector("#cnvs")
    let ctx = c.getContext("2d");

    //define the class
    class Ball {
        size
        x
        y
        xd
        yd
        self
        connects
        constructor(x, y) {
            this.x = x + config.ball.size
            this.y = y + config.ball.size
            this.size = config.ball.size
            this.xd = (Math.random() -0.5)*10
            this.yd = (Math.random() -0.5)*10
            this.self = this
            ctx.fillStyle = config.ball.color
            this.connects = []
        }

        setDir(x, y) {
            this.xd = x
            this.yd = y
        }


        move() {
            this.x += this.xd
            this.y += this.yd
        }

        draw() {
            ctx.beginPath()
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill()
        }
    }
    function move(ball) {
        if (ball.x < ball.size || ball.x >= c.width - ball.size) {
            ball.setDir(-ball.xd, ball.yd)
        }
        if (ball.y < ball.size || ball.y >= c.height - ball.size) {
            ball.setDir(ball.xd, -ball.yd)
        }
    }

    c.addEventListener('mousemove' , (e)=>{
        balls.pop()
        balls.push(new Ball(e.pageX , e.pageY , 1))
    })

    function distance(b1, b2) {
        d = Math.sqrt(Math.pow(b1.x - b2.x, 2) + Math.pow(b1.y - b2.y, 2))

        return d
    }

    let balls = [];

    for (let i = 0; i < config.ball.density; i++) {
        balls.push(new Ball(rnd(c.width), rnd(c.height), 2));
    }



    animate()
    function animate() {
        ctx.clearRect(0, 0, c.width, c.height);

        balls.forEach((ball) => {!
            move(ball)

            ball.move()
            ball.draw()
        })

        for (let i = 0; i < balls.length; i++) {
            for (let j = 0; j < balls.length; j++) {
                if (j == i) {
                    continue
                }
                if (distance(balls[i], balls[j]) < config.lines.distance) {
                    ctx.lineWidth = config.lines.distance/2 / distance(balls[i], balls[j]);
                    ctx.beginPath()
                    ctx.moveTo(balls[i].x, balls[i].y)
                    ctx.lineTo(balls[j].x, balls[j].y)
                    ctx.closePath()
                    ctx.stroke()
                }
            }
        }



        requestAnimationFrame(animate)
    }

}

function rnd(a) {
    return Math.floor(Math.random() * (a + 1))
}