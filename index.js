import { createParaphraser } from './paraphraser';
import { magic } from './helper';

class Paraphraser {
  constructor (options) {
    this.options = options || this._getDefaultParams();
    this.listeners = [];
    this.isOpen = false;

    this.targetArea = document.querySelector(this.options.textSelector);
    console.log('Caught text element:', this.targetArea);

    this.postBtn = document.querySelector(this.options.postBtnSelector);
    console.log('Caught post button:', this.postBtn);
  }

  _getDefaultParams () {
    return {
      textSelector: '[data-editor]',
      postBtnSelector: 'button[data-testid="react-composer-post-button"]',
    }
  }

  _insertTextReplaceOptions (coords = { x: 0, y: 0 }) {
    if (this.isOpen) return;
    const paraphraser = createParaphraser(coords);
    document.getElementsByTagName('body')[0].appendChild(paraphraser);
    paraphraser.scrollIntoView({ behavior: 'smooth' });
    this.isOpen = true;
  }

  _applyAreaListener () {
    console.log('Applied area event');
    const l = document.addEventListener('keydown', ev => {
      const keyName = ev.key;
      console.log('keydown event key: ' + keyName);
    });
    this.listeners.push({ type: 'keydown', listener: l });
  }

  _applyPostBtnListener () {
    console.log('Applied post btn event');
    const l = this.postBtn.addEventListener('click', ev => {
      ev.stopPropagation();

      const popupLoc = { x: +ev.pageX - (magic.CONTAINER_WIDTH / 2), y: +ev.pageY + magic.TOP_OFFSET };
      console.log(`Tried to post. CLicked on coords (${popupLoc.x}, ${popupLoc.y})`);
      this._insertTextReplaceOptions(popupLoc);
    });
    this.listeners.push({ type: 'keydown', listener: l });
  }

  apply () {
    console.group('Applying paraphraser');
    this._applyAreaListener();
    this._applyPostBtnListener();
    console.groupEnd()
  }

  reset () {
    this.listeners.forEach(l => {
      document.removeEventListener(l.type, l.listener);
    });
  }
}

const para = new Paraphraser();
para.apply();
