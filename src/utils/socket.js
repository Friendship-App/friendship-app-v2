import apiRoot from './api.config';
import io from 'socket.io-client';

export const socket = io('http://10.3.1.174:3000');
