import { Helper, magic } from './helper';

export function createParaphraser (coords) {
  function createHeader () {
    const span = document.createElement('span');
    span.innerText = 'It looks like this is hate speech.';

    const closeBtn = document.querySelector('div[aria-label="Dismiss"]').cloneNode(true);
    closeBtn.style.display = 'flex';

    const header = document.createElement('div');
    const headerStyles = {
      background: '#f5f6f7',
      padding: '10px',
      display: 'flex',
      'align-items': 'center',
      'font-size': '1.5em',
      'border-bottom': '1px solid black',
    };
    // header.innerText = 'It looks like this is hate speech.';
    Helper.applyStyleOnNode(header, headerStyles);

    header.appendChild(span);
    header.appendChild(closeBtn);

    return header;
  }

  function createBody () {

    function createParagraph () {
      const span = document.createElement('span');
      span.innerText = 'You may end up being banned form the site. How about changing the text to one of the following:';
      return span;
    }

    const body = document.createElement('div');
    const bodyStyles = {
      background: 'white',
      padding: '10px',
    };

    Helper.applyStyleOnNode(body, bodyStyles);
    body.appendChild(createParagraph());
    return body;
  }

  function createMainContainer () {
    const container = document.createElement("div");
    const styles = {
      background: 'white',
      overflow: 'hidden',
      border: '1px solid black',
      'border-radius': '3%',
      'font-size': '1em',
    };

    Helper.applyStyleOnNode(container, styles);
    container.appendChild(createHeader());
    container.appendChild(createBody());

    return container;
  }

  function createPointer () {
    const pointer = document.createElement("div");
    const styles = {
      width: 0,
      height: 0,
      'align-self': 'center',
      'border-left': '10px solid transparent',
      'border-right': '10px solid transparent',
      'border-bottom': '10px solid black',
      'border-top': 0,
    };

    Helper.applyStyleOnNode(pointer, styles);

    return pointer;
  }

  const node = document.createElement("div");
  const styles = {
    width: `${magic.CONTAINER_WIDTH}px`,
    position: 'absolute',
    left: coords.x + 'px',
    top: coords.y + 'px',
    display: 'flex',
    'flex-direction': 'column',
    'z-index': 10000
  };

  Helper.applyStyleOnNode(node, styles);
  node.appendChild(createPointer());
  node.appendChild(createMainContainer());

  return node;

}
