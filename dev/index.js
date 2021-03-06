const Hydra = require('./../index.js')
const loop = require('raf-loop')

//const shader = require('./../index.js').shaderGenerator

let metro;
let midi;

function init () {
  var hydra = new Hydra();
  window.hydra = hydra;

  midi = hydra.synth.midi;
  metro = hydra.synth.metronom;

  // exampleMetronom();
  // exampleMetronom();
  // exampleSmoothing();
///  exampleNonGlobal()

//  exampleExtendTransforms()
 
  
//
//   exampleAddFunction(hydra)
// //  exampleScreen()
//
// exampleCustomCanvas()
 // exampleSmoothing()
  ///var generator = new shader()

  // exampleMetronom();
  // learnShaders();
  exampleMetronom();


 // document.body.appendChild(canvas)
 //  var hydra = new Hydra({
 //  //  autoLoad: false
 //    canvas: canvas,
 //    enableStreamCapture: true,
 //    detectAudio: true,
 //    makeGlobal: false
 //  })
 
 //  window.hydra = hydra
 
 //  var sinN = v => (Math.sin(v)+1)/2
 //  var cosN = v => (Math.cos(v)+1)/2
 


 
 //  osc().out()
 
 //  // set bpm
 //  //hydra.bpm(30)
 
 //  var x = 0
 //  loop((dt) => {
 //    hydra.tick(dt)
 //  }).start()

//osc(5).out()
}

function learnShaders() {
  setFunction({
    name: 'myOsc', // name that will be used to access function as well as within glsl
    type: 'src', // can be src: vec4(vec2 _st), coord: vec2(vec2 _st), color: vec4(vec4 _c0), combine: vec4(vec4 _c0, vec4 _c1), combineCoord: vec2(vec2 _st, vec4 _c0)
 inputs: [
   {
    name: 'freq',
     type: 'float', // 'float'   //, 'texture', 'vec4'
     default: 0.2
   },
   {
    name: 'sync',
         type: 'float',
         default: 0.1
       },
       {
         name: 'offset',
         type: 'float',
         default: 0.0
       }
 ],    glsl: `
    vec2 st = _st;
   float r = sin((st.x-offset*20./freq-time*sync)*freq)*0.5  + 0.5;
   float g = sin((st.x+time*sync)*freq)*0.5 + 0.5;
   float b = sin((st.x+offset/freq+time*sync)*freq)*0.5  + 0.5;
   return vec4(abs(sin(time)),0.0,0.0,1.0);;
  `})

  myOsc(10, 0.2, 0.8).out()
}

function exampleEasingFunctions() {
  //  //
  //  // // Example array sequences
  //  // shape([4, 5, 3]).out()
  //  //
  //  // // array easing
  //  // shape([4, 3, 2].ease('easeInQuad')).out()
  //  //
  //  // // array smoothing
  //  // shape([4, 3, 2].smooth()).out()
}

function exampleNonGlobal() {
    var hydra = new Hydra({ makeGlobal: false })
    hydra.synth.fps = 10
    hydra.synth.osc().out()
    window.hydra = hydra
}

function exampleExtendTransforms() {
  var hydra = new Hydra({
    extendTransforms: {
      name: 'myOsc', // name that will be used to access function as well as within glsl
      type: 'src', // can be src: vec4(vec2 _st), coord: vec2(vec2 _st), color: vec4(vec4 _c0), combine: vec4(vec4 _c0, vec4 _c1), combineCoord: vec2(vec2 _st, vec4 _c0)
      inputs: [
        {
          name: 'freq',
          type: 'float', // 'float'   //, 'texture', 'vec4'
          default: 0.2
        },
        {
              name: 'sync',
              type: 'float',
              default: 0.1
            },
            {
              name: 'offset',
              type: 'float',
              default: 0.0
            }
      ],    glsl: `
         vec2 st = _st;
        float r = sin((st.x-offset*20./freq-time*sync)*freq)*0.5  + 0.5;
        float g = sin((st.x+time*sync)*freq)*0.5 + 0.5;
        float b = sin((st.x+offset/freq+time*sync)*freq)*0.5  + 0.5;
        return vec4(r, g, b, 1.0);
       `}
    })
    myOsc(10, 0.2, 0.8).out()

}

function exampleAddFunction(hydra) {
 // example custom function
 setFunction({
 name: 'myOsc', // name that will be used to access function as well as within glsl
 type: 'src', // can be src: vec4(vec2 _st), coord: vec2(vec2 _st), color: vec4(vec4 _c0), combine: vec4(vec4 _c0, vec4 _c1), combineCoord: vec2(vec2 _st, vec4 _c0)
 inputs: [
   {
    name: 'freq',
     type: 'float', // 'float'   //, 'texture', 'vec4'
     default: 0.2
   },
   {
    name: 'sync',
         type: 'float',
         default: 0.1
       },
       {
         name: 'offset',
         type: 'float',
         default: 0.0
       }
 ],    glsl: `
    vec2 st = _st;
   float r = sin((st.x-offset*20./freq-time*sync)*freq)*0.5  + 0.5;
   float g = sin((st.x+time*sync)*freq)*0.5 + 0.5;
   float b = sin((st.x+offset/freq+time*sync)*freq)*0.5  + 0.5;
   return vec4(r, g, b, 1.0);
  `})

  myOsc(10, 0.2, 0.8).out()
  //
  //  // ooo(10, 0.01, 1.2).blur().out()
}

function exampleScreen() {
  s0.initScreen()
  //src(s0).out()
}

function exampleCustomCanvas() {
   const canvas = document.createElement('canvas')
   canvas.style.backgroundColor = "#000"
   canvas.width = 800
   canvas.height = 200

   canvas.style.width = '50%'
   canvas.style.height = '50%'

//canvas.style.imageRe

   var ctx = canvas.getContext('2d')
   ctx.moveTo(0, 0);
   ctx.lineTo(200, 100);
   ctx.stroke();

   s0.init({src: canvas})
}


function exampleSmoothing() {
  var shapes = [
   shape(4)
     .scale(1,0.5,[0.5, 1,2])
     .scrollX(0.3),
   shape(4)
     .scale(1,0.5,[0.5, 1,2].smooth(0.5))
     .scrollX(0.0),
   shape(4)
     .scale(1,0.5,[0.5, 1,2].smooth())
     .scrollX(-0.3),
 ]

 solid()
   .add(shapes[0])
   .add(shapes[1])
   .add(shapes[2])
   .out(o0)
}

function exampleSetResolution() {
  setResolution(100, 100)
  shape(3,0.3).out();
}

function exampleMetronom() {
  console.log(midi);
  console.log(metro);
  shape(3, () => 0.3 + hydra.synth.metronom.variables.ones / 3).out();
}

window.onload = init
