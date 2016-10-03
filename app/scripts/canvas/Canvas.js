import * as utils from '../utils/utils';
import Globals from '../globals';
import cUtils from './canvasUtils';


export default class Canvas{

	constructor(canvas, context){
		this.canvas = utils.getEl(canvas, context);
		this.context = this.canvas.getContext('2d');

		this._init();

		this._initEvents();

		// this is for landscape 72dpi
		// this.a4BaseWidth = 842;
		// this.a4BaseHeight = 595;
		// console.log(czo);
	}

	_init(){
		this.setScreenDimensionsToCanvas();
	}

	_initEvents(){

		Globals.browser.on('browser:resize', this._resizeHandler.bind(this));

	}

	_resizeHandler(vw){

		this.setScreenDimensionsToCanvas();

	}

	setScreenDimensionsToCanvas(){

		let elDim = this.onScreenDimensions();

		this.canvas.width = elDim.width;
		this.canvas.height = elDim.height;

	}

	onScreenDimensions(){
		return cUtils.getDimensions(this.canvas);
	}

	setDPI( dpi = 72 ){
		// this.canvas.width = Math.round( this.a4BaseWidth  / 72 * dpi);
		// this.canvas.height = Math.round( this.a4BaseHeight  / 72 * dpi);
	}
}