window.addEventListener('load', function () {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    ctx.textAlign = 'center';
    let particleArray = [];
    let spinerArray = [];
    let game = false;

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
            this.player = 'null';
            this.remove_heal = 0;
            this.original_heal = 100;
            this.width = canvas.width / 20;
            this.height = canvas.height / 10;
        }
        uptade(){
            // if (this.remove_heal>0) {
            //     this.original_heal = this.original_heal - this.remove_heal;
            //     this.remove_heal = 0;
            // }
            if (gameDetals) {
                this.x = gameDetals.player_x;
                this.y = gameDetals.player_y;
                this.vx = gameDetals.player_vx;
                this.vy = gameDetals.player_vy;
            }
        }

    }

    function draw() {
        
    }

    var lastLoop = new Date();
    let fps_org = 30;
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

            var thisLoop = new Date();
            var fps = 1000 / (thisLoop - lastLoop);
            fps_org = Math.floor(fps);
            ctx.fillStyle = 'red';
            ctx.font = '50px san-serif';
            lastLoop = thisLoop;
        }
        else{
            register_box.style.display = 'flex';
        }
        requestAnimationFrame(animate);
    }
    animate()
    setInterval(() => {
        ctx.fillText(`FPS: ${fps_org}`, 100, 100);
    }, 1000);
})