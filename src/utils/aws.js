import apiRoot from './api.config';

export const getPreSignedUrl = async (type, formValues) => {
  let link = '/sign-s3?file-name=';
  let data;
  switch (type) {
    case 'PROFILE':
      link += 'profile/';
      break;
    case 'EVENT':
      link += 'events/';
      break;
  }
  data = formValues;
  if (!data.url) return undefined;

  const fragments = data.url.split('/');
  const fileName = `${data.itemName}-${fragments[fragments.length - 1]}`;

  const response = await fetch(
    `${apiRoot}${link}${fileName}&file-type=${data.imgType}`,
  );
  const myJson = await response.json();
  const { signedRequest, url } = myJson;

  const xhrPromise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', signedRequest);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          console.log('Image successfully uploaded to S3');
          resolve(url);
        } else {
          console.log('Error while sending the image to S3');
          resolve(undefined);
        }
      }
    };
    xhr.setRequestHeader('Content-Type', 'image/jpeg');
    xhr.send({
      uri: data.url,
      type: 'image/jpeg',
      name: fileName,
    });
  });
  const xhrResult = await xhrPromise;
  return xhrResult;
};
