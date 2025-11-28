module.exports = ({ env }) => ({
  email: {
    config: {
      provider: 'amazon-ses',
      providerOptions: {
        key: env('AWS_ACCESS_KEY'),
        secret: env('AWS_SECRET_KEY'),
        amazon: `https://email.${env('AWS_REGION')}.amazonaws.com`,
      },
      settings: {
        defaultFrom: env('AWS_SES_DEFAULT_FROM'),
        defaultReplyTo: env('AWS_SES_DEFAULT_REPLY_TO'),
      },
    },
  },
});
