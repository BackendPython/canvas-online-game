window.addEventListener('load', function () {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    ctx.textAlign = 'center';
    let particleArray = [];
    let playerArray = [];
    let wallArray = [];
    let game = true;

    let gameDetals = {
        player: 'null',
        player_x: 100,
        player_y: 100,
        player_vx: 0,
        player_vy: 0,
        player_heal: 100,
        player_dead: false,
        player_turn: 'idle',
    }

    class Player {
        constructor(){
            this.x = 0;
            this.y = 0;
            this.vx = 0;
            this.vy = 0;
            this.dead = false;
            this.color = 'gray';
            this.player = 'null';
            this.original_heal = 100;
            this.width = canvas.width / 100;
            this.height = canvas.height / 10;
        }
        uptade(){
            // if (this.remove_heal>0) {
            //     this.original_heal = this.original_heal - this.remove_heal;
            //     this.remove_heal = 0;
            // }
            if (this.dead==false) {
                this.x += this.vx;
                this.y += this.vy;
            }
        }
        draw(){
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.arc(this.x, this.y, 2, 0, Math.PI * 2, false);
            ctx.fill();
        }

    }

    function init(){
        for (let i = 0; i < 300; i++) {
            const player = new Player();
            player.x = Math.random() * canvas.width;
            player.y = Math.random() * canvas.height;
            player.vx = Math.random() * 5 - 1.5;
            player.vy = Math.random() * 5 - 1.5;
            playerArray.push(player);
        }
    }
    init();

    function draw() {
        for (let i = 0; i < playerArray.length; i++) {
            let particle = playerArray[i];
            if (particle.dead==false) {
                particle.uptade();
                particle.draw();
            }
        }
    }

    var lastLoop = new Date();
    let fps_count = 0;
    let fps_old = 60;


    window.addEventListener('resize', function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight    
    })

    function animate() {
        ctx.clearRect(0, 0, canvas.width * 10, canvas.height * 10);
        let register_box = document.getElementById('register')

        if (game==true) {
            register_box.style.display = 'none';
            draw();

            //  FPS calculate
            if (lastLoop) {
                var thisLoop = new Date();
                var fps = 1000 / (thisLoop - lastLoop);
                var fps_org = Math.floor(fps);
                ctx.fillStyle = 'green';
                if (fps_count>80) {
                    fps_count = 0;
                    fps_old = fps_org;
                    ctx.font = '50px san-serif';
                    ctx.fillText(`FPS: ${fps_org}`, 100, 100);
                }
                else{
                    fps_count++;
                    ctx.font = '50px san-serif';
                    ctx.fillText(`FPS: ${fps_old}`, 100, 100);
                }
                lastLoop = thisLoop;
            }

        }
        else{
            register_box.style.display = 'flex';
        }
        requestAnimationFrame(animate);
    }
    animate()
})