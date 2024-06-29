const map = document.querySelector("#game")
const buttonU = document.querySelector(".U");
const buttonD = document.querySelector(".D");
const buttonS = document.querySelector(".S");
const canvas = map.getContext('2d')
canvas.fillStyle = 'rgb( 60, 100, 0)'

const grid = 15
const cSpeed = 21
const pSpeed = 13
const lSpeed = 15
const l1Speed = 17
const l2Speed = 19

const con = document.querySelector("#level")
let coins = parseInt(con.textContent)
const rec = document.querySelector("#record")
let record = parseInt(rec.textContent)

let random = Math.floor(Math.random()*505)+15
let random1 = Math.floor(Math.random()*505)+15
let random2 = Math.floor(Math.random()*505)+15
let random3 = Math.floor(Math.random()*525)+15

const plaer = {
    x: grid * 15,
    y: map.height / 2,
    width: grid * 10,
    height: grid * 2,
    dx: 0,
    dy: 0,
}
const coin = {
    x: map.width,
    y: grid * 20,
    width: grid,
    height: grid,
    dx: -cSpeed,
    dy: random3,
}

const lock = {
    x: map.width,
    y: grid * 20,
    width: grid * 3,
    height: grid * 2,
    dx: -lSpeed,
    dy: random
}
const lock1 = {
    x: map.width + grid * 4,
    y: grid * 20,
    width: grid * 3,
    height: grid * 2,
    dx: -l1Speed,
    dy: random1
}
const lock2 = {
    x: map.width + grid * 8,
    y: grid * 20,
    width: grid * 3,
    height: grid * 2,
    dx: -l2Speed,
    dy: random2
}

function clearMap() {
    canvas.clearRect(0, 0, map.width, map.height);
}
function renderPlane(){
    canvas.fillStyle = 'rgb( 0, 22, 85)'
    canvas.fillRect(0, 0, map.width, map.height)
    canvas.fillStyle = 'rgb( 100, 100, 100)'
    canvas.fillRect(plaer.x, plaer.y, plaer.width, plaer.height)
    canvas.fillRect(plaer.x + plaer.width, plaer.y + 5, 10, 25)
    canvas.fillRect(plaer.x + plaer.width + 10, plaer.y + 10, 10, 15)
    canvas.fillRect(plaer.x + plaer.width + 20, plaer.y + 15, 5, 5)
    canvas.fillRect(plaer.x - 20, plaer.y , 20, 25)
    canvas.fillRect(plaer.x - 40, plaer.y , 20, 20)
    canvas.fillRect(plaer.x - 55, plaer.y , 20, 15)
    canvas.fillRect(plaer.x - 55, plaer.y - 5, 15, 5)
    canvas.fillRect(plaer.x - 60, plaer.y - 15, 10, 20)
    canvas.fillStyle = 'rgb( 82, 135, 255)'
    canvas.fillRect(plaer.x + 10, plaer.y + 10, 10, 10)
    canvas.fillRect(plaer.x + 30, plaer.y + 10, 10, 10)
    canvas.fillRect(plaer.x + 50, plaer.y + 10, 10, 10)
    canvas.fillRect(plaer.x + 70, plaer.y + 10, 10, 10)
    canvas.fillRect(plaer.x + 90, plaer.y + 10, 10, 10)
    canvas.fillRect(plaer.x + 110, plaer.y + 10, 10, 10)
    canvas.fillRect(plaer.x + 130, plaer.y + 10, 10, 10)
}

function renderOll() {
    canvas.fillStyle = 'rgb( 60, 30, 0)'
    canvas.fillRect(lock.x, lock.y, lock.width, lock.height)
    canvas.fillStyle = 'rgb( 200, 100, 0)'
    canvas.fillRect(lock.x +10, lock.y, 10, 10)
    canvas.fillRect(lock.x + 30, lock.y + 15, 15, 10)
    canvas.fillStyle = 'rgb( 60, 30, 0)'
    canvas.fillRect(lock1.x, lock1.y, lock1.width, lock1.height)
    canvas.fillStyle = 'rgb( 200, 100, 0)'
    canvas.fillRect(lock1.x +10, lock1.y + 5, 5, 5)
    canvas.fillRect(lock1.x + 25, lock1.y + 15, 15, 10)
    canvas.fillStyle = 'rgb( 60, 30, 0)'
    canvas.fillRect(lock2.x, lock2.y, lock2.width, lock2.height)
    canvas.fillStyle = 'rgb( 200, 100, 0)'
    canvas.fillRect(lock2.x +5, lock2.y + 5, 10, 5)
    canvas.fillRect(lock2.x + 30, lock2.y + 15, 5, 10)
    canvas.fillStyle = 'rgb( 2000, 2000, 0)'
    canvas.fillRect(coin.x, coin.y, coin.width, coin.height)
    canvas.fillStyle = 'rgb( 60, 100, 0)'
    canvas.fillRect(0, 0, map.width, grid); // Верхняя граница
    canvas.fillRect(0, map.height - grid, map.width, grid) // Нижняя граница
    canvas.fillRect(0, 0, grid, map.height) // Левая граница
    canvas.fillRect(map.width - grid, 0, grid, map.height) // Правая граница
}
function moveOll() {
    plaer.y += plaer.dy
    lock.x += lock.dx
    lock.y = random
    lock1.x += lock1.dx
    lock1.y = random1
    lock2.x += lock2.dx
    lock2.y = random2
    coin.x += coin.dx
    coin.y = random3
}
function isCollides(object1, object2) {
    const width1 = object1.x + object1.width+20;
    const width2 = object2.x + object2.width+20;
    const height1 = object1.y + object1.height;
    const height2 = object2.y + object2.height;
    return object1.x < width2
        && object2.x < width1
        && object1.y < height2
        && object2.y < height1
}
function colligeWisOll() {
    if (plaer.y < grid){
        plaer.y = grid
    } else if (plaer.y > map.height - grid*3){
        plaer.y = map.height - grid*3
    }
    if (lock.x < grid - grid * 3){
        lock.x = map.width
        random = Math.floor(Math.random()*505)+15
    }
    if (lock1.x < grid - grid * 3){
        lock1.x = map.width
        random1 = Math.floor(Math.random()*505)+15
    }
    if (lock2.x < grid - grid * 3){
        lock2.x = map.width
        random2 = Math.floor(Math.random()*505)+15
    }
    if (coin.x < grid - grid){
        coin.x = map.width
        random3 = Math.floor(Math.random()*525)+15
    }
}
function resetGame(){
    if (isCollides(plaer, coin)){
        random3 = Math.floor(Math.random()*535)+15
        coin.x = map.width
        coins++
        con.textContent = coins
    }
    if (isCollides(plaer, lock) || isCollides(plaer, lock1) || isCollides(plaer, lock2)){
        recordCheck()
        lock.x = map.width
        random = Math.floor(Math.random()*505)+15
        lock1.x = map.width
        random1 = Math.floor(Math.random()*505)+15
        lock2.x = map.width
        random2 = Math.floor(Math.random()*505)+15
        coin.x = map.width
        random3 = Math.floor(Math.random()*525)+15
        coins = 0
        con.textContent = coins

    }
    //Смерть и Баллы
}
function recordCheck(){
    if (coins > record){
        record = coins
        rec.textContent = record
    }
}

function loop() {
    clearMap()

    renderPlane()
    renderOll()
    moveOll()

    colligeWisOll()
    
    resetGame()
    requestAnimationFrame(loop)
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'w' || event.key === 'ц') {
        plaer.dy = -pSpeed;
    }
    else if (event.key === 's' || event.key === 'ы') {
        plaer.dy = pSpeed;
    }
});
buttonU.addEventListener('click', (event) => {
    plaer.dy = -pSpeed;
});
buttonD.addEventListener('click', (event) => {
    plaer.dy = pSpeed;
});
document.addEventListener('keyup', (event) => {
    if (event.key === 'w' || event.key === 'ц' || event.key === 's' || event.key === 'ы') {
        plaer.dy = 0;
    }
})

document.addEventListener('keydown', (event) => {
    if (event.key === 'f' || event.key === 'а') {
        fs()
    }
})
function fs(){
    if (!document.fullscreenElement){
        document.documentElement.requestFullscreen()
    } else if (document.exitFullscreen){
        document.exitFullscreen()
    }
}
buttonS.addEventListener('click', (event) => {
    if (!document.fullscreenElement){
        document.documentElement.requestFullscreen()
        buttonS.textContent = '><'
    } else if (document.exitFullscreen){
        document.exitFullscreen()
        buttonS.textContent
        buttonS.textContent = '<>'
    }
});
requestAnimationFrame(loop)