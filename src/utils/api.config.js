let apiRoot;
/**
 * If you want to test the app in your own phone, in case of an iPhone,
 * change the IP Address here after.
 * */
if (process.env.NODE_ENV === 'development') {
  apiRoot = 'http://10.3.1.174:3000/api';
} else {
  apiRoot = 'https://friendshipapp-backend.herokuapp.com/api';
}

export default apiRoot;
