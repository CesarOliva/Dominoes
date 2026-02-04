export default {
  providers: [
    {
      // domain: process.env.CONVEX_SITE_URL,
      // applicationID: "convex",
      domain: "https://accounts.google.com",
      applicationID: process.env.GOOGLE_CLIENT_ID!,
    },
  ],
};
