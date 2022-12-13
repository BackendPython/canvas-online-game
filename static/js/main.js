window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  ctx.textAlign = "center";
  let particleArray = [];
  let playerArray = [];
  let map = "wooden";
  let wallArray = [];
  const wall_id = 0;
  const map_id = 0;
  let game = true;

  const standart_widths = {num_100: canvas.width/20,};

  const imageRecources = [
    {title: 'wooden', image_element: document.getElementById('wooden')},
    {title: 'brick', image_element: document.getElementById('brick')},
    {title: '_wall', image_element: document.getElementById('wooden_wall')},
  ]

  const mapsArray = [
    {
      title: "wooden",
      wallsCount: 28,
      walls: [
        { x: 0, y: 200, width: standart_widths.num_100, height: 100 },
        { x: 90, y: 200, width: standart_widths.num_100, height: 100 },
        { x: 180, y: 200, width: standart_widths.num_100, height: 100 },
        { x: 270, y: 200, width: standart_widths.num_100, height: 100 },
        { x: 360, y: 200, width: standart_widths.num_100, height: 100 },
        { x: 450, y: 200, width: standart_widths.num_100, height: 100 },
        { x: 540, y: 200, width: standart_widths.num_100, height: 100 },
        { x: 0, y: 500, width: standart_widths.num_100, height: standart_widths.num_100 },
        { x: 90, y: 500, width: standart_widths.num_100, height: standart_widths.num_100 },
        { x: 180, y: 500, width: standart_widths.num_100, height: standart_widths.num_100 },
        { x: 270, y: 500, width: standart_widths.num_100, height: standart_widths.num_100 },
        { x: 360, y: 500, width: standart_widths.num_100, height: standart_widths.num_100 },
        { x: 450, y: 500, width: standart_widths.num_100, height: standart_widths.num_100 },
        { x: 540, y: 500, width: standart_widths.num_100, height: standart_widths.num_100 },
        { x: 0, y: 200, width: standart_widths.num_100, height: standart_widths.num_100 },
        { x: 90, y: 200, width: standart_widths.num_100, height: standart_widths.num_100 },
        { x: 180, y: 200, width: standart_widths.num_100, height: standart_widths.num_100 },
        { x: 270, y: 200, width: standart_widths.num_100, height: standart_widths.num_100 },
        { x: 360, y: 200, width: standart_widths.num_100, height: standart_widths.num_100 },
        { x: 450, y: 200, width: standart_widths.num_100, height: standart_widths.num_100 },
        { x: 540, y: 200, width: standart_widths.num_100, height: standart_widths.num_100 },
        { x: 0, y: 500, width: standart_widths.num_100, height: standart_widths.num_100 },
        { x: 90, y: 500, width: standart_widths.num_100, height: standart_widths.num_100 },
        { x: 180, y: 500, width: standart_widths.num_100, height: standart_widths.num_100 },
        { x: 270, y: 500, width: standart_widths.num_100, height: standart_widths.num_100 },
        { x: 360, y: 500, width: standart_widths.num_100, height: standart_widths.num_100 },
        { x: 450, y: 500, width: standart_widths.num_100, height: standart_widths.num_100 },
        { x: 540, y: 500, width: standart_widths.num_100, height: standart_widths.num_100 },
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
    draw(image) {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      //ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.drawImage(image, this.x, this.y, this.width, this.height);
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
    if (map == "wooden") {
      mapsArray.forEach(function (map_name) {
        if (map_name.title == map) {
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
      });
    }
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
        for (let m = 0; m < imageRecources.length; m++) {
            const mTitle = imageRecources[m];
            if (mTitle.title==map) {
                box_wall.uptade();
                box_wall.draw(mTitle.image_element);
            }
        }
    }
  }

  var lastLoop = new Date();
  let fps_count = 0;
  let fps_old = 60;

  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    standart_widths.num_100 = canvas.width / 20;
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
