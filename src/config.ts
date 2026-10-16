// PtEverywhere online booking portal
export const BOOKING_URL =
  'https://app.pteverywhere.com/6acd4a20f98e85993494d82f/bookingonlinePtE/service=6acd4a20f98e85993494d864';

export const CONTACT_EMAIL = 'Ryan@summittwellness.com';

export const PHONE_DISPLAY = '(317) 440-4633';
export const PHONE_HREF = 'tel:+13174404633';

export const LOCATIONS = [
  {
    city: 'Zionsville',
    host: 'CrossFit AFCO',
    street: '10650 Bennett Pkwy Ext #100',
    locality: 'Zionsville',
    region: 'IN',
    postalCode: '46077',
  },
  {
    city: 'Carmel',
    host: 'Indy Muscle & Joint',
    street: '520 Industrial Dr Ste 110',
    locality: 'Carmel',
    region: 'IN',
    postalCode: '46032',
  },
].map((loc) => ({
  ...loc,
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${loc.street}, ${loc.locality}, ${loc.region} ${loc.postalCode}`,
  )}`,
}));
