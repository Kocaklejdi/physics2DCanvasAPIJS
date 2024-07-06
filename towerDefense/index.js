const canvas = document.getElementById("myCanvas")
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d")
const {
    width,
    height
} = canvas.getBoundingClientRect()

canvas.width = width;
canvas.height = height;
let walls = [
    new Obstacle(0,100,width,1), 
    new Obstacle(100,0,1,height),
    new Obstacle(width-100,0,1,height), 
    new Obstacle(0,height - 100,width,1)]
const player1 = new Character(600,500,50,50, walls)

let firstClick = false;
let firstClickPos = false
let secondClickPos = false
let lines = []

function divider(wall){
    const size = 8;
    if(wall.w > size && wall.h > size){
        const littleWalls = []
        for(let i = 0; i < Math.ceil(wall.h / size); i++){
            for(let j = 0; j < Math.ceil(wall.w / size); j++){
                littleWalls.push(new Obstacle(wall.x + j * size, wall.y + i * size, size, size))
            }
        }
        return littleWalls
    }
    return false
}
let divisions = false

document.addEventListener("mousemove",(e)=>{
    if(firstClick){
        ctx.fillStyle = "rgb(0,0,0)"
        ctx.fillRect(firstClickPos.x,firstClickPos.y,e.clientX - firstClickPos.x,e.clientY - firstClickPos.y)
    }
})


document.addEventListener("mousedown",(e)=>{
    if(!firstClick){
        console.log(e)
        firstClick = true
        firstClickPos = {
            x:e.clientX,
            y:e.clientY
        }
        console.log(firstClickPos)
    }else{
        console.log(e)
        firstClick = false;
        secondClickPos = {
            x:e.clientX,
            y:e.clientY
        }
        console.log(secondClickPos)
    }
    if(secondClickPos != false ){
        console.log(firstClickPos)
        walls.push(new Obstacle(firstClickPos.x,firstClickPos.y,secondClickPos.x - firstClickPos.x,secondClickPos.y - firstClickPos.y))
        walls.forEach((wall,i)=>{
            divisions = divider(wall)
            if(divisions){
                walls.splice(i,1)
                walls = [...walls,...divisions]
            }
        })
        
        player1.walls = walls
        console.log(walls)
        firstClickPos = false
        secondClickPos = false
    }
})
function clearCanvas(){
    ctx.fillStyle = "rgb(255,255,255)"
    ctx.fillRect(0,0,width,height)
}

function drawGame(){
    clearCanvas()
    player1.walls.forEach((wall)=>{
        wall.showSelf(ctx)
    })
    player1.update()
    player1.checkCollisions()
    player1.showSelf(ctx);
}

setInterval(()=>{
    drawGame()
    // console.log(AABB(player1,wall1))
},1000/60)