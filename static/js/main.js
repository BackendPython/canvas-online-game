window.addEventListener('load', function () {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    let particleArray = [];
    let spinerArray = [];
    let gameDetals = {
        
    }

    class Spiner {
        constructor(){
            this.x = 0;
            this.y = 0;
            this.vx = 0;
            this.vy = 0;
            this.score = 0;
            this.size = 50;
            this.dead = false;
            this.color = 'red';
            this.originalX = 0;
            this.originalY = 0;
            this.player = 'null';
            this.colision = false;
            this.colision_name = 'null';
        }
        uptade(){
            this.x += this.vx;
            this.y += this.vy;
        }
        draw(){
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fill();
            ctx.closePath();
        }
    }

    function init(){
        for (let i = 0; i < 2; i++) {
            let newSpiner = new Spiner();
            newSpiner.x = Math.random() * canvas.width;
            newSpiner.y = Math.random() * canvas.height;
            newSpiner.vx = Math.random() -1.5 + 1;
            newSpiner.vy = Math.random() -1.5 + 1;
            spinerArray.push(newSpiner);
        }
    }
    init();

    function draw(){
        for (let i = 0; i < spinerArray.length; i++) {
            let spiner = spinerArray[i];
            for (let j = 0; j < spinerArray.length; j++) {
            if (spiner.dead==false) {
                let spiner2 = spinerArray[j];
                let a = spiner2.y - spiner.y;
                let b = spiner2.x - spiner.x;
                let distance = Math.sqrt(Math.pow(a,2) + Math.pow(b,2));
                if (distance < (spiner.size + spiner2.size)) {
                    spiner.colision = true;
                    spiner2.colision = true;
                }
                else{
                    spiner.colision = false;
                    spiner2.colision = false;
                }
            }
                // ctx.font = '50px san-serif'
                // ctx.fillText(`Distance: ${distance}`, 100, 100)
            }
        }
        for (let y = 0; y < spinerArray.length; y++) {
            let spiner = spinerArray[y];
            if (spiner.colision==true) {
                spiner.color = 'green';
            }
            else{
                spiner.color = 'red';
            }
            spiner.uptade();
            spiner.draw();
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width * 10, canvas.height * 10);
        let register_box = document.getElementById('register')

        if (gameDetals) {
            register_box.style.display = 'none';
            draw();
        }
        else{
            register_box.style.display = 'flex';
        }
        requestAnimationFrame(animate);
    }
    animate()
})