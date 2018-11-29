//////////////////// Initialize webGL ////////////////////

var gl;
var shaderProgram;

function initGL(canvas){
	try{
		console.log(canvas);
		gl = canvas.getContext("webgl");
		console.log(gl);
		gl.viewportWidth = canvas.width;
		gl.viewportHeight = canvas.height;
	}catch(e){}
	if(!gl) {
		alert("Cannot initialize GL");
	}
	//console.log("========== exit initGL ==========");
}


//////////////////// Variables ////////////////////

{
	// transformation matrices
	var mMatrix = mat4.create(); // model matrix
	var vMatrix = mat4.create(); // view matrix
	var mvMatrix = mat4.create(); //modelview matrix
	var pMatrix = mat4.create(); //perspective matrix
	var mvpMatrix = mat4.create();
	var nMatrix = mat4.create(); //normal matrix
	var v2wMatrix = mat4.create();
	var Z_angle = 0.0;
}


//////////////////// Set WebGL Shaders ////////////////////

function setViewUniforms() {
	gl.uniformMatrix4fv(shaderProgram.mvpMatrixUniform, false, mvpMatrix);
	gl.uniformMatrix4fv(shaderProgram.nMatrixUniform, false, nMatrix);
}

function setAllMatrices(){
	
	// setup mvp
	mat4.lookAt(vMatrix, getCamera("cameraLoc"), getCamera("cameraFocus"), getCamera("viewUp"));
	mat4.perspective(pMatrix, toRad(60), 1.0, 0.1, 100);
	mat4.multiply(mvMatrix, vMatrix, mMatrix);
	mat4.multiply(mvpMatrix, pMatrix, mvMatrix);

	// setup normals
	mat4.identity(nMatrix); 
	mat4.multiply(nMatrix, nMatrix, vMatrix);
	mat4.multiply(nMatrix, nMatrix, mMatrix); 	
	mat4.invert(nMatrix, nMatrix);
	mat4.transpose(nMatrix, nMatrix);

	// setup v2w
	mat4.identity(v2wMatrix);
	mat4.multiply(v2wMatrix, v2wMatrix, vMatrix);  
	mat4.transpose(v2wMatrix, v2wMatrix); 

	setViewUniforms();
}

function drawScene(){
	// set matrix
	setAllMatrices();

	// draw objects
	drawCube();
}

function webGLStart(){

	console.log("==========enter webGLStart==========");

	var canvas = document.getElementById("canvas");
	initGL(canvas);
	initShaders();

	// setup the viewport
	gl.enable(gl.DEPTH_TEST);
	gl.clearColor(1.0, 1.0, 1.0, 1.0); //white
	gl.viewport(0.0, 0.0, gl.viewportWidth, gl. viewportHeight);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	// get attribute in shader
	shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
	gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
	shaderProgram.vertexNormalAttribute = gl.getAttribLocation(shaderProgram, "aVertexNormal");
	gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);

	//get uniform in shader
	shaderProgram.mvpMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVPMatrix");
	shaderProgram.nMatrixUniform = gl.getUniformLocation(shaderProgram, "uNMatrix");

	// initial vbo and draw
	initCubeBuffer();
	drawScene();
}


//////////////////// Helper Functions ////////////////////

function toRad(degree){
	return degree*Math.PI/180;
}

function getCamera(id){
	var vector =[];
	var x = +document.getElementById(id + "X").value;
	var y = +document.getElementById(id + "Y").value;
	var z = +document.getElementById(id + "Z").value;
	console.log("[" + x + ", " + y + ", " + z + "]");
	console.log(x+y+z);
	vector.push(x);
	vector.push(y);
	vector.push(z);

	console.log(id, " ", vector);
	return vector;
}
