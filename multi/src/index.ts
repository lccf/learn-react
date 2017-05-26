import use from './library/use';
import * as Block from './block';
import * as App from './app';
import * as ndoo from 'ndoojs';

use(App, Block);

ndoo.init('home/index');