var objTexture1;
var objTexture2;

function initObjTexture1() {
	objTexture1 = gl.createTexture();
	objTexture1.image = new Image();
	objTexture1.image.onload = function() { 
		gl.bindTexture(gl.TEXTURE_2D, objTexture1);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, objTexture1.image);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		gl.bindTexture(gl.TEXTURE_2D, null);
	}
	objTexture1.image.src = "liang1.jpeg";
}

function initObjTexture2() {
	objTexture2 = gl.createTexture();
	objTexture2.image = new Image();
	objTexture2.image.onload = function() { 
		gl.bindTexture(gl.TEXTURE_2D, objTexture2);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, objTexture2.image);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		gl.bindTexture(gl.TEXTURE_2D, null);
	}

	objTexture2.image.src = "liang2.jpg";
}