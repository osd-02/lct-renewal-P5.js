'use strict';

// test

// --- 直線ノイズ正規分布
// stX, stY, enX, enY：始点終点座標
// width：変化幅
// scale：変化量

const CNL = p => {
  p.setup = () => {
    const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
    canvas.position(0,0);
    canvas.style('z-index','-2');
    p.background(200);
    p.strokeWeight(2);
    p.stroke(256);
    p.strokeJoin(p.round);
    p.strokeCap(p.ROUND);
    p.frameRate(1);
  }
  
  let stX = 0;
  let stY = 0;
  let enX = 0;
  let enY = 0;
  let width = 5;
  let scale = 5;
  
  p.draw = () => {
    let angle = Math.atan((enY - stY)/(enX - stX));
    let verticalAngle = angle + Math.PI/2;
    let length = Math.sqrt((enX - stX)**2 + (enY - stY)**2);
    function rnorm(){
      return Math.sqrt(-2 * Math.log(1 - Math.random())) * Math.cos(2 * Math.PI * Math.random());
    }
    p.noFill();
    p.smooth();
    p.strokeCap(p.ROUND);
    p.beginShape();
    for (let pros = 0; pros < length; pros += width) {
      let x = stX + Math.cos(angle)*pros;
      let y = stY + Math.sin(angle)*pros;
      let rand = rnorm()-0.5;
      p.randX = x + rand*(scale*Math.cos(verticalAngle));
      p.randY = y + rand*(scale*Math.sin(verticalAngle));
      p.curveVertex(p.randX, p.randY);
    }
    p.endShape();
    stY += p.random()*200;
    enX += p.random()*200;
  }
}

const CNF = p => {
  p.setup = () => {
    const canvas = p.createCanvas(300, 300);
    canvas.position('relative',0,0,0);
    canvas.style('z-index','-1');
    p.frameRate(20)
    p.background(230,0,0,0);
    let xstart = p.random(200);
    let xnoise = xstart;
    let ynoise = p.random(200);
    p.noStroke();
    p.smooth();
    
    for (let y = 20; y <= p.height - 20; y +=8) {
      ynoise += 0.03;
      xnoise = xstart;
      for (let x = 20; x <= p.width - 20; x +=8) {
        xnoise += 0.03;
        let alpha = p.noise(xnoise, ynoise) * 340;
        p.push();
        p.translate(x+3, y+3);
        p.rotate(p.noise(ynoise, xnoise) * p.radians(360));
        p.fill(0, alpha);
        p.rect(0,0,10,10,2);
        p.pop();
      }
    }
  }
}

const myp5 = new p5(CNL, "wrapper");
const myp5Ar = new p5(CNF, "article");