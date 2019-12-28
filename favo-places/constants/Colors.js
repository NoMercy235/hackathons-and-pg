import { isAndroid } from '../utils/utils';

const primary = '#fc9208';

export default {
  primary,
  border: '#ccc',
  forOs: {
    primary: () => isAndroid() ? primary : '',
    white: () => isAndroid() ? 'white' : primary,
  },
}
