import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { ConvexHttpClient } from 'convex/browser'
import { api } from '../../../../convex/_generated/api'

// Optional svix import
let Webhook: any = null
try {
  const svix = require('svix')
  Webhook = svix.Webhook
} catch (error) {
  console.log('Svix not available, webhook verification disabled')
}

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }

  const headerPayload = headers()
  const svix_id = headerPayload.get("svix-id")
  const svix_timestamp = headerPayload.get("svix-timestamp")
  const svix_signature = headerPayload.get("svix-signature")

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400
    })
  }

  const payload = await req.json()
  const body = JSON.stringify(payload)

  let evt: WebhookEvent

  if (Webhook) {
    const wh = new Webhook(WEBHOOK_SECRET)
    try {
      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      }) as WebhookEvent
    } catch (err) {
      console.error('Error verifying webhook:', err)
      return new Response('Error occured', {
        status: 400
      })
    }
  } else {
    // Fallback when svix is not available
    evt = payload as WebhookEvent
  }

  if (evt.type === 'user.created') {
    await convex.mutation(api.users.createUser, {
      userId: evt.data.id,
      email: evt.data.email_addresses[0]?.email_address || '',
      name: `${evt.data.first_name || ''} ${evt.data.last_name || ''}`.trim(),
    })
  }

  return new Response('', { status: 200 })
}