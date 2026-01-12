const canvas=document.createElement("canvas");
document.body.appendChild(canvas);
canvas.style.position="fixed";
canvas.style.inset="0";
canvas.style.zIndex="-2";

const gl=canvas.getContext("webgl");
canvas.width=innerWidth;
canvas.height=innerHeight;

const vs=`
attribute vec2 p;
void main(){gl_Position=vec4(p,0.,1.);}
`;
const fs=`
precision highp float;
uniform float t;
void main(){
 vec2 uv=(gl_FragCoord.xy/vec2(${innerWidth.toFixed(1)},${innerHeight.toFixed(1)})-.5)*2.;
 float r=length(uv);
 float a=atan(uv.y,uv.x);
 float swirl=sin(a*6.+t*2.)*.3;
 float c=1.-smoothstep(.2,.8,r+swirl);
 gl_FragColor=vec4(vec3(c*.1,c*.8,c),1.);
}
`;
function compile(type,src){
 const s=gl.createShader(type);
 gl.shaderSource(s,src);gl.compileShader(s);return s;
}
const prog=gl.createProgram();
gl.attachShader(prog,compile(gl.VERTEX_SHADER,vs));
gl.attachShader(prog,compile(gl.FRAGMENT_SHADER,fs));
gl.linkProgram(prog);gl.useProgram(prog);

const buf=gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,buf);
gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);

const loc=gl.getAttribLocation(prog,"p");
gl.enableVertexAttribArray(loc);
gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);

const tLoc=gl.getUniformLocation(prog,"t");
function draw(t){
 gl.uniform1f(tLoc,t*.001);
 gl.drawArrays(gl.TRIANGLE_STRIP,0,4);
 requestAnimationFrame(draw);
}
draw(0);
