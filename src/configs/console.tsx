export const console = {
  persistence: {
    ttl:
      Number(import.meta.env.VITE_KANTHOR_CONSOLE_PERSISTENCE_TTL) ||
      24 * 60 * 60,
  },
};
