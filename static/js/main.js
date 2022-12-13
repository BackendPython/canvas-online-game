window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  ctx.textAlign = "center";
  let particleArray = [];
  let map = "nocturnal";
  let playerArray = [];
  let wallArray = [];
  const wall_id = 0; 
  const map_id = 0;
  let game = true;

  const mapsArray = [
    {
      title: "nocturnal",
      wallsCount: 10,
      walls: [
        { x: 0, y: 100, width: 100, height: 100 },
        { x: 100, y: 100, width: 100, height: 100 },
        { x: 200, y: 100, width: 100, height: 100 },
        { x: 300, y: 300, width: 100, height: 100 },
        { x: 110, y: 300, width: 100, height: 100 },
        { x: 230, y: 300, width: 100, height: 100 },
        { x: 0, y: 500, width: 100, height: 100 },
        { x: 110, y: 500, width: 100, height: 100 },
        { x: 230, y: 500, width: 100, height: 100 },
        { x: 0, y: 700, width: 100, height: 100 },
        { x: 0, y: 100, width: 100, height: 100 },
        { x: 110, y: 100, width: 100, height: 100 },
        { x: 230, y: 100, width: 100, height: 100 },
        { x: 0, y: 300, width: 100, height: 100 },
        { x: 110, y: 300, width: 100, height: 100 },
        { x: 230, y: 300, width: 100, height: 100 },
        { x: 0, y: 500, width: 100, height: 100 },
        { x: 110, y: 500, width: 100, height: 100 },
        { x: 230, y: 500, width: 100, height: 100 },
        { x: 0, y: 700, width: 100, height: 100 },
        
      ],
    },
  ];

  let gameDetals = {
    player: "null",
    player_x: 100,
    player_y: 100,
    player_vx: 0,
    player_vy: 0,
    player_heal: 100,
    player_dead: false,
    player_turn: "idle",
  };

  // class Nocturnal {
  //     constructor(){
  //         this.x = 0;
  //         this.y = 0;
  //         this.width = 100;
  //         this.height = 100;
  //         this.color = 'red';
  //         this.wall_count = 10;
  //         this.colision = false;
  //         this.wall1 = {x: 0, y: 100}
  //     }
  //     uptade(){

  //     }
  //     draw(){

  //     }
  // }

  class Box_Wall {
    constructor() {
      this.x = 0;
      this.y = 0;
      this.width = 100;
      this.height = 100;
      this.color = "red";
      this.image = "null";
      this.colision = false;
    }
    uptade() {}
    draw() {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.fill();
      ctx.closePath();
    }
  }

  class Player {
    constructor() {
      this.x = 0;
      this.y = 0;
      this.vx = 0;
      this.vy = 0;
      this.dead = false;
      this.color = "blue";
      this.player = "null";
      this.original_heal = 100;
      this.width = canvas.width / 100;
      this.height = canvas.height / 10;
    }
    uptade() {
      // if (this.remove_heal>0) {
      //     this.original_heal = this.original_heal - this.remove_heal;
      //     this.remove_heal = 0;
      // }
      if (this.dead == false) {
        this.x += this.vx;
        this.y += this.vy;
      }
    }
    draw() {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.arc(this.x, this.y, 2, 0, Math.PI * 2, false);
      ctx.fill();
    }
  }

  function init() {
    // for (let i = 0; i < 300; i++) {
    //     const player = new Player();
    //     player.x = Math.random() * canvas.width;
    //     player.y = Math.random() * canvas.height;
    //     player.vx = Math.random() * 5 - 1.5;
    //     player.vy = Math.random() * 5 - 1.5;
    //     playerArray.push(player);
    // }
    if (map == "nocturnal") {
        mapsArray.forEach(function (map_name) {
            if (map_name.title=='nocturnal') {
                for (let b = 0; b < map_name.wallsCount; b++) {
                    let box_wall_info = map_name.walls[b];
                    let box_wall = new Box_Wall();
                    box_wall.x = box_wall_info.x;
                    box_wall.y = box_wall_info.y;
                    box_wall.width = box_wall_info.width;
                    box_wall.height = box_wall_info.height;
                    wallArray.push(box_wall);
                  }
            }
        })
    }
    console.log(wallArray);
  }
  init();

  function draw() {
    for (let i = 0; i < playerArray.length; i++) {
      let player = playerArray[i];
      if (player.dead == false) {
        player.uptade();
        player.draw();
      }
    }
    for (let b = 0; b < wallArray.length; b++) {
      const box_wall = wallArray[b];
      box_wall.uptade();
      box_wall.draw();
    }
  }

  var lastLoop = new Date();
  let fps_count = 0;
  let fps_old = 60;

  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  function animate() {
    ctx.clearRect(0, 0, canvas.width * 10, canvas.height * 10);
    let register_box = document.getElementById("register");

    if (game == true) {
      register_box.style.display = "none";
      draw();

      //  FPS calculate
      if (lastLoop) {
        var thisLoop = new Date();
        var fps = 1000 / (thisLoop - lastLoop);
        var fps_org = Math.floor(fps);
        ctx.fillStyle = "green";
        if (fps_count > 80) {
          fps_count = 0;
          fps_old = fps_org;
          ctx.font = "50px san-serif";
          ctx.fillText(`FPS: ${fps_org}`, 100, 100);
        } else {
          fps_count++;
          ctx.font = "50px san-serif";
          ctx.fillText(`FPS: ${fps_old}`, 100, 100);
        }
        lastLoop = thisLoop;
      }
    } else {
      register_box.style.display = "flex";
    }
    requestAnimationFrame(animate);
  }
  animate();
});
