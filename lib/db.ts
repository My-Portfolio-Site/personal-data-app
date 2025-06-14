import { getCloudflareContext } from "@opennextjs/cloudflare";

export const db: D1Database = (await getCloudflareContext({async: true})).env.DB;
// export const db: D1Database = getCloudflareContext().env.DB;
