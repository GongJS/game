// 这是我们的玩家要躲避的敌人
var Enemy = function() {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    // 定义虫子的属性：包括位置／速度／头像
    this.x = -50;
    this.y = Math.floor(Math.random() * 4 + 1)*83-25;
    this.speed = 80 + Math.random() *  150;
    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.x += dt * this.speed;
    if (this.x > 500){
       this.x = -50;
    };
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数

var Player = function () {
    this.x = 200;
    this.y = 390;
    this.sprite = 'images/char-boy.png';
 };

 Player.prototype.update = function (dt) {
    player.handleInput();
    if(this.x < 0) this.x =0;
    if(this.x > 405) this.x = 400;
    if(this.y > 390) this.y = 390;
    // 判断是否到达终点
    if(this.y < -20) {
       this.y = -10;
       setTimeout(func,"100");
           function func(){
             alert("你赢了！！ 点击确定后进入下一盘游戏");
      };
      this.y = 390;
    };
 };

 Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
 };

 Player.prototype.handleInput = function (allowedKeys) {
    switch(allowedKeys){
    case 'left': this.x -= 100; break;
    case 'down':this.y += 83; break;
    case 'right':this.x += 100;break;
    case 'up':this.y -= 83; break;
    };
 };


//---实现碰撞函数
Player.prototype.checkCollisions = function(){
    for(var i=0;i<allEnemies.length;i++){
    	// --- 修改7 y值没有取绝对值 导致有些情况  即-40的时候 也会发生碰撞
        if((Math.abs(this.y - allEnemies[i].y))<40){
            if((Math.abs(this.x - allEnemies[i].x))<40){
              // 让玩家回到游戏开始的位置
                this.x = 205;
                this.y = 390;
            }
       }
    }
};

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面

var allEnemies=new Array();
// 限制一个屏幕里最多同时存在6只甲虫
for (var n = 0;n<6;n++){
  allEnemies.push(new Enemy());
};
var player = new Player();

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
