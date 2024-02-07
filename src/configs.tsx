export default {
  project: {
    name: "Kanthor",
    version: "2022.1201.1701",
  },
  api: {
    auth: {
      engine:  import.meta.env.VITE_AUTH_ENGINE || "ask",
      ask: {
        uri: import.meta.env.VITE_AUTH_ASK_URI,
        email: import.meta.env.VITE_AUTH_ASK_EMAIL,
        password: import.meta.env.VITE_AUTH_ASK_PASSWORD,
      },
      external: {
        uri: import.meta.env.VITE_AUTH_EXTERNAL_URI,
      },
    },
    sdk: {
      uri: import.meta.env.VITE_SDK_URI,
    },
    portal: {
      uri: import.meta.env.VITE_PORTAL_URI,
    },
  },
};
