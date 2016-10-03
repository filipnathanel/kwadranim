export default class canvasUtils {
	
	static mousePos(e, canvas){

		let rect = canvas.getBoundingClientRect(), 
		scaleX = canvas.width / rect.width,    
		scaleY = canvas.height / rect.height;  

		return {
			x: (e.clientX - rect.left) * scaleX, 
			y: (e.clientY - rect.top) * scaleY    
		}
	}

	static getDimensions(canvas){

		let rect = canvas.getBoundingClientRect();

		return{
			width:rect.width,
			height:rect.height
		};

	}

}