var squareVertexPositionBuffer;
var squareVertexColorBuffer;
var squareVertexIndexBuffer;
var squareVertexNormalBuffer;


function initCubeBuffers(size){
	initSquareBuffers(size/2);
}

function drawCube(size){
	//setup camera
	mat4.lookAt(vMatrix, getCamera("cameraLoc"), getCamera("cameraFocus"), getCamera("viewUp"));
	mat4.perspective(pMatrix, toRad(60), 1.0, 0.1, 100);
	initCubeBuffers(size);

	var a = size/2;

	// front
	mat4.identity(mMatrix);
	mat4.rotate(mMatrix, mMatrix, toRad(180), [0,1,0]);
	mat4.translate(mMatrix, mMatrix, [0,0,a]);
	gl.activeTexture(gl.TEXTURE0);
	gl.bindTexture(gl.TEXTURE_2D, enviTexture0);
	gl.uniform1i(shaderProgram.texture0, 0);
	drawSquare();

	//back
	mat4.identity(mMatrix);
	mat4.translate(mMatrix, mMatrix, [0,0,a]);
	gl.activeTexture(gl.TEXTURE1);
	gl.bindTexture(gl.TEXTURE_2D, enviTexture1);
	gl.uniform1i(shaderProgram.texture0, 1);
	drawSquare();

	//right
	mat4.identity(mMatrix);
	mat4.rotate(mMatrix, mMatrix, toRad(90), [0,1,0]);
	mat4.translate(mMatrix, mMatrix, [0,0,a]);
	gl.activeTexture(gl.TEXTURE2);
	gl.bindTexture(gl.TEXTURE_2D, enviTexture2);
	gl.uniform1i(shaderProgram.texture0, 2);
	drawSquare();

	//left
	mat4.identity(mMatrix);
	mat4.rotate(mMatrix, mMatrix, toRad(-90), [0,1,0]);
	mat4.translate(mMatrix, mMatrix, [0,0,a]);
	gl.activeTexture(gl.TEXTURE3);
	gl.bindTexture(gl.TEXTURE_2D, enviTexture3);
	gl.uniform1i(shaderProgram.texture0, 3);
	drawSquare();

	//top
	mat4.identity(mMatrix);
	mat4.rotate(mMatrix, mMatrix, toRad(-90), [1,0,0]);
	mat4.translate(mMatrix, mMatrix, [0,0,a]);
	gl.activeTexture(gl.TEXTURE4);
	gl.bindTexture(gl.TEXTURE_2D, enviTexture4);
	gl.uniform1i(shaderProgram.texture0, 4);
	drawSquare();

	//bottom
	mat4.identity(mMatrix);
	mat4.rotate(mMatrix, mMatrix, toRad(90), [1,0,0]);
	mat4.translate(mMatrix, mMatrix, [0,0,a]);
	gl.activeTexture(gl.TEXTURE5);
	gl.bindTexture(gl.TEXTURE_2D, enviTexture5);
	gl.uniform1i(shaderProgram.texture0, 5);
	drawSquare();
}

//////////////////// Buffers ////////////////////

function initSquareBuffers(a){
	// console.log("========== enter initSquareBuffers ==========");
	
	var numSquareVertices = 4;

	var squareVertices = [
		a, a, 0, 
		-a, a, 0, 
		-a, -a, 0, 
		a, -a, 0
	];
	var squareNormals = [0,0,1,	0,0,1, 	0,0,1, 	0,0,1];
	// var squareNormals = normal.concat(normal).concat(normal).concat(normal);
	var squareIndices = [0, 1, 2, 0, 2, 3];
	var sqTexCoords = [1, 1, 0, 1, 0, 0, 1, 0];

	squareVertexPositionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(squareVertices), gl.STATIC_DRAW);
	squareVertexPositionBuffer.itemSize = 3;
	squareVertexPositionBuffer.numItems = numSquareVertices;

	// squareVertexNormalBuffer = gl.createBuffer();
	// gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexNormalBuffer);
	// gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(squareNormals), gl.STATIC_DRAW);
	// squareVertexNormalBuffer.itemSize = 3;
	// squareVertexNormalBuffer.numItems = numSquareVertices;

	squareVertexIndexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, squareVertexIndexBuffer); 
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(squareIndices), gl.STATIC_DRAW);  
	squareVertexIndexBuffer.itemSize = 1;
	squareVertexIndexBuffer.numItems = squareIndices.length;

	squareVertexTexCoordsBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexTexCoordsBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(sqTexCoords), gl.STATIC_DRAW);
	squareVertexTexCoordsBuffer.itemSize = 2;
	squareVertexTexCoordsBuffer.numItems = 4;

	// console.log("squareVertices = ", squareVertices); 
	// console.log("squareNormals = ", squareNormals);
	// console.log("squareIndices = ", squareIndices);
	// console.log("squareVertexTexCoordsBuffer = ", squareVertexTexCoordsBuffer);

	// console.log("========== exit initSquareBuffers ==========");
}


//////////////////// Draw Elements ////////////////////

function drawSquare(){
	// console.log("========== enter drawSquare ==========");

	setAllMatrices();
	
	gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexPositionBuffer);
	gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, squareVertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
	
	// gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexNormalBuffer);
	// gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, squareVertexNormalBuffer.itemSize, gl.FLOAT, false, 0, 0);
	
	gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexTexCoordsBuffer);
	gl.vertexAttribPointer(shaderProgram.vertexTexCoordsAttribute, squareVertexTexCoordsBuffer.itemSize, gl.FLOAT, false, 0, 0);   


	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, squareVertexIndexBuffer);
	gl.drawElements(gl.TRIANGLES, squareVertexIndexBuffer.numItems , gl.UNSIGNED_SHORT, 0);

	// console.log("========== exit drawSquare ==========");
}


//////////////////// Helper ////////////////////

function getNormals(direction){
	var normals = [0, 0, 0];
	if(direction>0){
		for(var i=2; i>-1; i--){
			normals[i] = direction%2;
			direction = Math.floor(direction/2);
		}
	}else{
		for(var i=2; i>-1; i--){
			normals[i] = direction%2;
			direction = Math.ceil(direction/2);
		}
	}
	return normals;
}

