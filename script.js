const map = document.querySelector("#game")
const canvas = map.getContext('2d')
canvas.fillStyle = 'rgb( 60, 100, 0)'

const grid = 15
const cSpeed = 20                      
const pSpeed = 10
const lSpeed = 15

const con = document.querySelector("#level")
let coins = parseInt(L.textContent)

let random = Math.floor(Math.random()*550)+1
let random1 = Math.floor(Math.random()*550)+1
let random2 = Math.floor(Math.random()*550)+1
let random3 = Math.floor(Math.random()*550)+1

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
    dy: random3
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
    x: map.width,
    y: grid * 20,
    width: grid * 3,
    height: grid * 2,
    dx: -lSpeed,
    dy: random1
}
const lock2 = {
    x: map.width,
    y: grid * 20,
    width: grid * 3,
    height: grid * 2,
    dx: -lSpeed,
    dy: random2
}

function renderMap() {
    canvas.fillRect(0, 0, map.width, grid); // Верхняя граница
    canvas.fillRect(0, map.height - grid, map.width, grid) // Нижняя граница
    canvas.fillRect(0, 0, grid, map.height) // Левая граница
    canvas.fillRect(map.width - grid, 0, grid, map.height) // Правая граница
}
function clearMap() {
    canvas.clearRect(0, 0, map.width, map.height);
}
function renderOll() {
    canvas.fillRect(plaer.x, plaer.y, plaer.width, plaer.height)
    canvas.fillRect(lock.x, lock.y, lock.width, lock.height)
    canvas.fillRect(lock1.x, lock1.y, lock1.width, lock1.height)
    canvas.fillRect(lock2.x, lock2.y, lock2.width, lock2.height)
    canvas.fillRect(coin.x, coin.y, coin.width, coin.height)
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
    const width1 = object1.x + object1.width;
    const width2 = object2.x + object2.width;
    const height1 = object1.y + object1.height;
    const height2 = object2.y + object2.height;
    return object1.x < width2
        && object2.x < width1
        && object1.y < height2
        && object2.y < height1;
}
function colligeWisOll() {
    if (plaer.y < grid){
        plaer.y = grid
    } else if (plaer.y > map.height - grid*3){
        plaer.y = map.height - grid*3
    }
    if (lock.x < grid){
        lock.x = map.width
        random = Math.floor(Math.random()*550)+1
    }
    if (lock1.x < grid){
        lock1.x = map.width
        random1 = Math.floor(Math.random()*550)+1
    }
    if (lock2.x < grid){
        lock2.x = map.width
        random2 = Math.floor(Math.random()*550)+1
    }
}
function resetGame(){
    //Смерть и Баллы
}

function loop() {
    clearMap()
    
    renderOll()
    moveOll()

    colligeWisOll()
    
    // resetGame()
    renderMap()
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
requestAnimationFrame(loop)