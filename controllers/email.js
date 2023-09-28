import emailjs from '@emailjs/nodejs';

const templateParams = {
  name: 'James',
  notes: 'Check this out!',
};

emailjs
  .send('<YOUR_SERVICE_ID>', '<YOUR_TEMPLATE_ID>', templateParams, {
    publicKey: '<YOUR_PUBLIC_KEY>',
    privateKey: '<YOUR_PRIVATE_KEY>', // optional, highly recommended for security reasons
  })
  .then(
    (response) => {
      console.log('SUCCESS!', response.status, response.text);
    },
    (err) => {
      console.log('FAILED...', err);
    },
  );