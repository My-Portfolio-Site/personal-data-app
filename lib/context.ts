import { CloudflareContext, getCloudflareContext } from "@opennextjs/cloudflare";

// export const db: D1Database = (await getCloudflareContext({async: true})).env.DB;

export const context: CloudflareContext = await getCloudflareContext({ async: true });
