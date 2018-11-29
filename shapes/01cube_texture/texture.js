var enviTexture0;
var enviTexture1;
var enviTexture2;
var enviTexture3;
var enviTexture4;
var enviTexture5;

function initEnvironment() {

	initEnviTexture0(); // front
	initEnviTexture1(); // back
	initEnviTexture2(); // right
	initEnviTexture3(); // left
	initEnviTexture4(); // up
	initEnviTexture5(); // down

}

function initEnviTexture0() {
	enviTexture0 = gl.createTexture();
	enviTexture0.image = new Image();
	enviTexture0.image.onload = function() { 
		gl.bindTexture(gl.TEXTURE_2D, enviTexture0);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, enviTexture0.image);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		gl.bindTexture(gl.TEXTURE_2D, null);
	}
	enviTexture0.image.src = "./envi/front.png";
}

function initEnviTexture1() {
	enviTexture1 = gl.createTexture();
	enviTexture1.image = new Image();
	enviTexture1.image.onload = function() { 
		gl.bindTexture(gl.TEXTURE_2D, enviTexture1);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, enviTexture1.image);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		gl.bindTexture(gl.TEXTURE_2D, null);
	}
	enviTexture1.image.src = "./envi/back.png";
}

function initEnviTexture2() {
	enviTexture2 = gl.createTexture();
	enviTexture2.image = new Image();
	enviTexture2.image.onload = function() { 
		gl.bindTexture(gl.TEXTURE_2D, enviTexture2);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, enviTexture2.image);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		gl.bindTexture(gl.TEXTURE_2D, null);
	}

	enviTexture2.image.src = "./envi/right.png";
}

function initEnviTexture3() {
	enviTexture3 = gl.createTexture();
	enviTexture3.image = new Image();
	enviTexture3.image.onload = function() { 
		gl.bindTexture(gl.TEXTURE_2D, enviTexture3);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, enviTexture3.image);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		gl.bindTexture(gl.TEXTURE_2D, null);
	}
	enviTexture3.image.src = "./envi/left.png";
}

function initEnviTexture4() {
	enviTexture4 = gl.createTexture();
	enviTexture4.image = new Image();
	enviTexture4.image.onload = function() { 
		gl.bindTexture(gl.TEXTURE_2D, enviTexture4);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, enviTexture4.image);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		gl.bindTexture(gl.TEXTURE_2D, null);
	}
	enviTexture4.image.src = "./envi/upper.png";
}

function initEnviTexture5() {
	enviTexture5 = gl.createTexture();
	enviTexture5.image = new Image();
	enviTexture5.image.onload = function() { 
		gl.bindTexture(gl.TEXTURE_2D, enviTexture5);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, enviTexture5.image);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		gl.bindTexture(gl.TEXTURE_2D, null);
	}
	enviTexture5.image.src = "./envi/down.png";
}