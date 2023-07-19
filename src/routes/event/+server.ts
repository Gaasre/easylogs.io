import type { Website } from "$lib/interfaces/Website";
import { error } from "@sveltejs/kit";
import type { LogEvent } from "easylogs-client";
import type { RequestHandler } from "./$types"
import supabaseBypass from "$lib/supabaseClient.server";

export const POST: RequestHandler = (async ({ request, url, locals: { supabase }, getClientAddress }) => {
    const body: LogEvent = await request.json()
    console.log(body)

    if (!body.website || !body.message) {
        throw error(400)
    }

    const { data: website } = await supabase.from('website')
        .select('*')
        .eq('domain', url.host)
        .single<Website>()

    if (!website) {
        throw error(404)
    }

    await supabaseBypass.from('logs')
        .insert({
            value: body.message,
            website: url.host,
            user_id: website.user_id,
            type: body.type,
            namespace: body.namespace
        })

    return new Response('Success');
})