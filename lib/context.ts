'use server'

import { CloudflareContext, getCloudflareContext } from "@opennextjs/cloudflare";


export const context: CloudflareContext =  await getCloudflareContext({ async: true });
