import type { Website, WebsiteWithStats } from "$lib/interfaces/Website"
import { redirect } from "@sveltejs/kit"
import moment from "moment"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ url, locals: { getSession, supabase }, params }) => {
    const session = await getSession()
    if (!session) {
        throw redirect(303, '/')
    }

    const { data: websites } = await supabase
        .rpc('get_user_websites', { user_id: session.user.id, log_date: moment().format('YYYY/MM/DD') })
        .returns<WebsiteWithStats[]>()

    return { websites: websites ?? [] }
}