const https = require('https');

export default function verify() {
  const options = {
    hostname: 'api.paystack.co',
    port: 443,
    path: '/bank',
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PAYSTACK_SECRET_KEY}`,
    },
  };
  https
    .request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        console.log(JSON.parse(data));
      });
      // res.status(200).json(data);
    })
    .on('error', (error) => {
      console.error(error);
    });
}
