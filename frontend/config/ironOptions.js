const ironOptions = {
  cookieName: 'universe',
  password: process.env.IRON_SESSION_OPTIONS_PASSWORD,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

export default ironOptions;
