// 这是我们的玩家要躲避的敌人
var Enemy = function() {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
  this.x = -50;
 this.y = Math.random() * 400;
 this.speed = 150 + Math.random() *  (300 - 150);

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
this.y = Math.random() * 400;
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
this.y = 430;
  this.sprite = 'images/char-boy.png';
 };

 Player.prototype.update = function (dt) {
   player.handleInput();

    if(this.x < 0) this.x =0;
     if(this.x > 405) this.x = 400;
     if(this.y < 0) this.y =0;
     if(this.y > 430) this.y = 430;
  };

 Player.prototype.render = function() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
 };

 Player.prototype.handleInput = function (allowedKeys) {
   switch(allowedKeys){
 case 'left':
 this.x -= 30;
 break;
 case 'down':
 this.y += 30;
 break;
 case 'right':
 this.x += 30;
 break;
 case 'up':
 this.y -= 30;
 break;
 }

 }

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
//---实现碰撞函数
Player.prototype.checkCollisions = function(){
    for(var i=0;i<allEnemies.length;i++){
    	// --- 修改7 y值没有取绝对值 导致有些情况  即-40的时候 也会发生碰撞
        if((Math.abs(this.y - allEnemies[i].y))<40){
            if((Math.abs(this.x - allEnemies[i].x))<40){
                this.x = 205;
                // --- 修改3 玩家起始位置设为405
                this.y = 405;
            }
       }
    }
};
var allEnemies=new Array();

//想用while循环嵌套，判定维player.y<83,同样不能实现
for (var n = 0;n<3;n++){
  var Enemy_here = new Enemy();
  allEnemies.push(Enemy_here);
}
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
