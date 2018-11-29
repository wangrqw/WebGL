var cubeVertexPositionBuffer;
var cubeVertexIndexBuffer;
var cubeVertexNormalBuffer;

function initCubeBuffer(){
	var a = 1;

	var vertices = [
		+a,+a,+a,	-a,+a,+a,	-a,-a,+a,	+a,-a,+a,	// front
		-a,+a,-a,	+a,+a,-a,	+a,-a,-a,	-a,-a,-a,	// back
		+a,+a,-a,	+a,+a,+a,	+a,-a,+a,	+a,-a,-a,	// right
		-a,+a,+a,	-a,+a,-a,	-a,-a,-a,	-a,-a,+a,	// left
		+a,+a,-a,	-a,+a,-a,	-a,+a,+a,	+a,+a,+a,	// upper
		+a,-a,+a,	+a,-a,-a,	-a,-a,-a,	-a,-a,+a	// bottom
	];

	var normals = getNormals([0,0,1]).concat(getNormals([0,0,-1]))
		.concat(getNormals([1,0,0])).concat(getNormals([-1,0,0]))
		.concat(getNormals([0,1,0])).concat(getNormals([0,-1,0]));
	var indices = getIndices();
	
	console.log("vertices = ", vertices);
	console.log("normals = ", normals);
	console.log("indices = ", indices);

	cubeVertexPositionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexPositionBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	cubeVertexPositionBuffer.itemSize = 3;
	cubeVertexPositionBuffer.numItems = vertices.length/3;

	cubeVertexNormalBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexNormalBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
	cubeVertexNormalBuffer.itemSize = 3;
	cubeVertexNormalBuffer.numItems = normals.length/3;

	cubeVertexIndexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer); 
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);  
	cubeVertexIndexBuffer.itemSize = 1;
	cubeVertexIndexBuffer.numItems = indices.length;
}

function drawCube(){

	gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexPositionBuffer);
	gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, cubeVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
	
	gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexNormalBuffer);
	gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, cubeVertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);

	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeVertexIndexBuffer);
	gl.drawElements(gl.TRIANGLES, cubeVertexIndexBuffer.numItems , gl.UNSIGNED_SHORT, 0);

}

//////////////////// Helper Functions ////////////////////

function getNormals(vector){
	vector = vector.concat(vector); //double
	vector = vector.concat(vector); //double double
	return vector;
}

function getIndices(){
	var indices = [];
	for(var i=0; i<6*4; i+=4){
		indices.push(i);	indices.push(i+1);	indices.push(i+2);
		indices.push(i);	indices.push(i+2);	indices.push(i+3);
	}
	return indices;
}