import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

serve(async (req) => {
    // 1. Secret Verification
    // We expect calls like: https://project.functions.supabase.co/linko-webhook?secret=YOUR_SECRET
    const url = new URL(req.url)
    const secret = url.searchParams.get('secret')
    const expectedSecret = Deno.env.get('LINKO_WEBHOOK_SECRET')

    if (!expectedSecret || secret !== expectedSecret) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
        })
    }

    // 2. Parse Payload
    try {
        const payload = await req.json()
        console.log('Received Linko Webhook:', JSON.stringify(payload))

        // Initialize Supabase Client
        const supabaseUrl = Deno.env.get('SUPABASE_URL')!
        const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
        const supabase = createClient(supabaseUrl, supabaseKey)

        // TODO: Adjust these fields based on actual Linko API docs
        // Assumption: Linko sends { "product_id": "LINKO_ID", "current_stock": 100 }
        // OR: { "items": [ { "sku": "...", "qty": ... } ] }

        // Example handling for a hypothetical payload:
        const linkoId = payload.product_id || payload.id || payload.sku
        const newStock = payload.stock || payload.quantity || payload.qty

        if (!linkoId || newStock === undefined) {
            return new Response(JSON.stringify({ message: 'No product ID or stock found in payload', payload }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            })
        }

        // 3. Update Database
        // Find product by external_id and update stock
        const { data, error } = await supabase
            .from('products')
            .update({
                stock: newStock,
                last_synced_at: new Date().toISOString()
            })
            .eq('external_id', String(linkoId))
            .select()

        if (error) throw error

        if (!data || data.length === 0) {
            console.log(`Product with external_id ${linkoId} not found`)
            return new Response(JSON.stringify({ message: 'Product not found', linkoId }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            })
        }

        return new Response(JSON.stringify({ message: 'Stock updated', product: data[0] }), {
            headers: { "Content-Type": "application/json" },
        })

    } catch (error) {
        console.error('Error processing webhook:', error)
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        })
    }
})
