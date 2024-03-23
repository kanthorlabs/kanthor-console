export const console = {
  persistence: {
    ttl: Number(import.meta.env.VITE_KANTHOR_CONSOLE_PERSISTENCE_TTL) || 86400,
  },
};
