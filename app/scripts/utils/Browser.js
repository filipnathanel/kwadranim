import Emitter from './emitter'
import * as utils from './utils';

export default class Browser extends Emitter {

	constructor(){

		super();

      this.resizeHandler = utils.debounce( this.resizeHandler.bind(this), 200);

      this.initEvents();

  }

  initEvents(){

    this.resizeThrottleTime = 200;

    window.addEventListener('resize', this.resizeHandler );

  }

  resizeHandler(){

    let vw = utils.getViewportDimensions();

    this.trigger('browser:resize', {
      width: vw.width,
      height: vw.height
    });

  }
	
}