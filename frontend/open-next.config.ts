import { defineCloudflareConfig } from "@opennextjs/cloudflare";

console.log("Loading OpenNext Config...");

export default defineCloudflareConfig({
  // @ts-ignore
  build: {
    external: ["sharp"],
    esbuild: {
      loader: {
        ".node": "empty",
      },
    },
  },
});
