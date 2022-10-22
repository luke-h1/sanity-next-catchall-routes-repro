import client from '@sanity/client';

const studioClient = client({
  projectId: 'dknsrs1g',
  dataset: 'production',
  apiVersion: '2022-09-21',
  useCdn: process.env.NODE_ENV === 'production',
});

export default studioClient;
