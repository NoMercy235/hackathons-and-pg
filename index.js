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

  _onClose (ev) {
    const body = document.getElementsByTagName('body')[0];
    this.isOpen = false;
    const node = document.getElementById('noho-paraphraser');
    node && body.removeChild(node);
  }

  _insertTextReplaceOptions (coords = { x: 0, y: 0 }) {
    if (this.isOpen) return;
    const body = document.getElementsByTagName('body')[0];

    const options = {
      id: 'noho-paraphraser',
      coords,
      onClose: this._onClose.bind(this)
    };

    const paraphraser = createParaphraser(options);
    body.appendChild(paraphraser);
    paraphraser.scrollIntoView({ behavior: 'smooth' });
    this.isOpen = true;
  }

  _applyAreaListener () {
    let l;
    l = document.addEventListener('click', this._onClose.bind(this));
    this.listeners.push({ type: 'keydown', listener: l });

    l = document.addEventListener('keydown', ev => {
      const keyName = ev.key;
      console.log('keydown event key: ' + keyName);
    });
    this.listeners.push({ type: 'keydown', listener: l });
    console.log('Applied area event');
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
