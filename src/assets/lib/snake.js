
var nodeWH = 15
var direction = 'right'
var timer = null
var nodes=[]
var food = null
var foods= []


//var _tmpFood = "../images/food.png"
//var _tmpSnake = "../images/node.png"
var _tmpFood = new Image()
_tmpFood.src="assets/images/food.png"

var _tmpSnake = new Image()
_tmpSnake.src="assets/images/node.png"

var ctx = document.getElementById('snakeCanvas');
var context=ctx.getContext('2d');

var lastPoint = null
var isGameOver = false
var that
var score = 0

$(function () {

    //$("img").attr('src',_tmpFood)

    createSnake();
    createFood();
    draw();


})



function Node(x,y){
    this.x = x;
    this.y = y;
}

function createSnake(){
    nodes.splice(0, nodes.length)
    for (var i = 4; i >= 0; i--) {
        var node = new Node(nodeWH * (i), nodeWH)
        nodes.push(node);
    }
}

function createFood(){
    foods= []
    for (var i = 20; i >= 0; i--) {
        var _x = parseInt(Math.random() * 20) * nodeWH + nodeWH
        var _y = parseInt(Math.random() * 13) * nodeWH + nodeWH
        //console.log(_y)
        if(_y != 15){
            var _food = new Node(_x, _y)
            foods.push(_food);
        }else{
            i++
        }

    }
}


//绘制蛇与食物
function draw(){
    clearCanvas()
    console.log(_tmpSnake)
    console.log(_tmpFood)
    console.log(nodes.length);
    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i]
        //console.log(node)
        if (i == 0) {
           // context.fillStyle('#ff0000')
        } else {
           // context.fillStyle('#000000')
        }
        context.beginPath()
        context.rect(node.x, node.y, nodeWH, nodeWH)
        context.closePath()
        //context.fill()

        context.drawImage(_tmpSnake,node.x, node.y, nodeWH, nodeWH)
    }


    for (var i = 0; i < foods.length; i++) {

        var food = foods[i]
        //console.log(food)
        //context.setFillStyle('#0000ff')
        context.beginPath()
        context.rect(food.x, food.y, nodeWH, nodeWH)
        context.closePath()
        //context.fill()
        context.drawImage(_tmpFood,food.x, food.y, nodeWH, nodeWH)
    }

    //context.draw()



    // wx.drawCanvas({
    //   canvasId: 'snakeCanvas',
    //   actions: context.getActions()
    // })
}

//游戏结束
function gameOver(){
    isGameOver = true
    clearInterval(timer)
    wx.showModal({
        title:'Game Over',
        content:'总得分：'+ score +'，不服再来?',
        confirmText:'不服',
        success:function(e){
            if (e.confirm == true) {
                startGame()
            } else {
                console.log('cancel')
                that.setData({
                    btnTitle:'开始'
                })
            }
        }
    })
}

//是否吃到食物
function isEatedFood(){
    var head = nodes[0]


    for (var i = 0; i < foods.length; i++) {
        var food = foods[i]
        if (head.x == food.x && head.y == food.y) {
            score++
            console.log('吃到'+food.x+"，"+food.y)
            nodes.push(lastPoint)
            //console.log(foods)
            foods.splice(i, 1)
            //console.log(foods)

            //createFood()
        }
    }
}

//是否撞到墙壁或者撞到自己的身体
function isDestroy(){
    var head = nodes[0]
    for (var i = 1; i < nodes.length; i++) {
        var node = nodes[i]
        if (head.x == node.x && head.y == node.y) {
            gameOver()
        }
    }
    console.log("head.x="+head.x)
    if (head.x < 0 || head.x > 330) {
        gameOver()
    }
    if (head.y < 15 || head.y > 225) {
        gameOver()
    }
}

function moveEnd(){
    isEatedFood()
    isDestroy()
    draw()
}

function move(){
    console.log('移动')
    lastPoint = nodes[nodes.length - 1]
    var node = nodes[0]
    var newNode = {x: node.x, y: node.y}
    switch (direction) {
        case 'up':
            newNode.y -= nodeWH;
            break;
        case 'left':
            newNode.x -= nodeWH;
            break;
        case 'right':
            newNode.x += nodeWH;
            break;
        case 'down':
            newNode.y += nodeWH;
            break;
    }
    nodes.pop()
    nodes.unshift(newNode)
    moveEnd()
}

function startGame() {
    console.log('开始游戏')
    if (isGameOver) {
        direction = 'right'
        createSnake()
        createFood()
        score = 0
        isGameOver = false
    }
    timer = setInterval(move,1000)
}

function changeDirection(e){
    if ('开始' == $("#startGame").val()) return
    var title = e
    if (title == 'down' || title == 'up') {
        if (direction == 'up' || direction == 'down') return
    } else if (direction == 'left' || direction == 'right') return
    direction = title;
}

function startGameClick() {
    var title = $("#startGame").val();
    //console.log(title)
    //startGame()
    if (title == '暂停') {
        clearInterval(timer)
        $("#startGame").val("开始");
    } else {
        startGame()
        $("#startGame").val("暂停");
    }
}


function clearCanvas()
{
    var c=document.getElementById("snakeCanvas");
    var cxt=c.getContext("2d");
    c.height = c.height;
}
