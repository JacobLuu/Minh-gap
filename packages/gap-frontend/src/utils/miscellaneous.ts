// Implemented based on: stackoverflow.com/a/5100158/9725161
// Convert DataURL to Blob and then convert Blob to png File
export const convertDataURLtoPngFile = (dataURI: string): Blob => {
  // convert base64/URLEncoded data component to raw binary data held in a string
  let byteString;
  if (dataURI.split(',')[0].indexOf('base64') >= 0)
    byteString = window.atob(dataURI.split(',')[1]);
  else byteString = decodeURIComponent(dataURI.split(',')[1]);

  // separate out the mime component
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to a typed array
  const ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  const blob = new Blob([ia], { type: mimeString });
  return new File([blob], 'signature.png', {
    type: 'image/png',
    lastModified: Date.now(),
  });
};
