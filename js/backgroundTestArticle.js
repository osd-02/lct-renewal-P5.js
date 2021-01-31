var back = function(p) {
  // --- 直線ノイズ正規分布
  // stX, stY, enX, enY：始点終点座標
  // width：変化幅
  // scale：変化量
  p.createNoiseLine = function(stX, stY, enX, enY, width, scale) {
    let angle = float(Math.atan((enY - stY)/(enX - stX)));
    let verticalAngle = float(angle + Math.PI/2);
    let length = Math.sqrt((enX - stX)**2 + (enY - stY)**2);
    function rnorm(){
      return Math.sqrt(-2 * Math.log(1 - Math.random())) * Math.cos(2 * Math.PI * Math.random());
    }
    p.noFill();
    p.smooth();
    p.strokeCap(ROUND)
    p.beginShape();
    for (let pros = float(0); pros < length; pros += float(width)) {
      let x = float(stX + Math.cos(angle)*pros);
      let y = float(stY + Math.sin(angle)*pros);
      let rand = rnorm()-0.5
      randX = x + rand*(scale*Math.cos(verticalAngle));
      randY = y + rand*(scale*Math.sin(verticalAngle));
      p.curveVertex(randX, randY);
    }
    p.endShape();
  }
  
  p.setup = function() {
    p.createCanvas(300, 300);
    // p.position(0,0);
    p.style('z-index','-1');
    p.background(255)
    p.strokeWeight(2)
    p.strokeJoin(round)
  }
  
  let x = 0;
  let y = 0;

  p.draw = function () {
    p.createNoiseLine(0,y,x,0,6,4);
    x += 20
    y += 20
  }
}

var backNews = function(p) {
  p.setup = function() {
    p.createCanvas(300, 300);
    // p.position(0,0,'relative');
    p.style('z-index','-1');
    p.background(255);
    p.frameRate(20)
    p.background(255);
    let xstart = random(200);
    let xnoise = xstart;
    let ynoise = random(200);
    p.noStroke();
    p.smooth();
    
    for (let y = -30; y <= height - 30; y +=8) {
      ynoise += 0.03;
      xnoise = xstart;
      for (let x = -30; x <= width - 30; x +=8) {
        xnoise += 0.03;
        let alpha = int(noise(xnoise, ynoise) * 255);
        p.push();
        p.translate(x+3, y+3);
        p.rotate(noise(ynoise, xnoise) * radians(360));
        p.fill(0, alpha);
        p.rect(0,0,10,10,2);
        p.pop();
      }
    }
  }
}

// new p5(back, "wrapper");
// new p5(backNews, "article");