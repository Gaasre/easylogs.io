import type { ILog } from '$lib/interfaces/Log'
import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import moment from 'moment'
import type { Website } from '$lib/interfaces/Website'
import type { IFilter } from '$lib/interfaces/Filter'

const PAGE_COUNT = 20;

export const load: PageServerLoad = async ({ url, locals: { getSession, supabase }, params }) => {
    const session = await getSession()
    if (!session) {
        throw redirect(303, '/')
    }

    const activeFilterStr = url.searchParams.get('filters');
    let date = url.searchParams.get('date');
    if (!date) {
        date = moment().format('YYYY-MM-DD');
    }

    let { data: filters } = await supabase
        .from('filter')
        .select('*')
        .returns<IFilter[]>()

    if (filters && activeFilterStr) {
        const activeFilters = activeFilterStr?.split(',');
        filters = filters.map(filter => {
            filter.active = activeFilters?.findIndex(x => x == filter.name) != -1;
            return filter;
        })
    }

    const anon = filters?.filter(x => x.active).map(x => {
        if (x.type == 'contains') {
            return `value.ilike.*${x.value}*`
        } else if (x.type == 'starts-with') {
            return `value.ilike.${x.value}*`
        } else if (x.type == 'ends-with') {
            return `value.ilike.*${x.value}`
        }

        return `value.ilike.*${x.value}*`
    })

    const { data: websites } = await supabase
        .from('website')
        .select('*')
        .returns<Website[]>()

    if (!websites) {
        return {
            url: url.origin, stats: {
                errors: 0,
                successes: 0,
                warnings: 0,
                infos: 0
            }, statSeries: {
                errors: [],
                successes: [],
                warnings: [],
                infos: []
            }, logs: [], websites, domain: params.domain, date, count: 0
        }
    }

    let { data: fullLogs, count } = await supabase
        .from('logs')
        .select('*', { count: 'exact' })
        .or(anon && anon.length > 0 ? anon.join("&") : 'value.ilike.**')
        .eq('website', params.domain)
        .order('date', { ascending: false })
        .gte('date', moment(date, 'YYYY-MM-DD').startOf('day').toISOString())
        .lte('date', moment(date, 'YYYY-MM-DD').endOf('day').toISOString())
        .returns<ILog[]>()

    if (!fullLogs) {
        fullLogs = []
    }

    const { data: logs } = await supabase
        .from('logs')
        .select()
        .eq('website', params.domain)
        .or(anon && anon.length > 0 ? anon.join("&") : 'value.ilike.**')
        .order('date', { ascending: false })
        .gte('date', moment(date, 'YYYY-MM-DD').startOf('day').toISOString())
        .lte('date', moment(date, 'YYYY-MM-DD').endOf('day').toISOString())
        .limit(PAGE_COUNT)
        .returns<ILog[]>()

    const stats = {
        errors: fullLogs?.filter(log => log.type == 'error').length,
        infos: fullLogs?.filter(log => log.type == 'info').length,
        warnings: fullLogs?.filter(log => log.type == 'warning').length,
        successes: fullLogs?.filter(log => log.type == 'success').length
    }

    let statSeries = {
        errors: fullLogs?.filter(log => log.type == 'error').map(log => {
            const date = moment(log.date)
            date.minute(0)
            date.second(0)
            date.millisecond(0)
            return { ...log, date: date }
        }).reduce((groups, item) => {
            if (groups.length > 0) {
                const foundIndex = groups.findIndex(x => x[0] == item.date.valueOf())
                if (foundIndex != -1) {
                    groups[foundIndex][1] += 1;
                } else {
                    groups.push([item.date.valueOf(), 1]);
                }
            } else {
                groups.push([item.date.valueOf(), 1]);
            }
            return groups;
        }, [] as number[][]),
        infos: fullLogs?.filter(log => log.type == 'info').map(log => {
            const date = moment(log.date)
            date.minute(0)
            date.second(0)
            date.millisecond(0)
            return { ...log, date: date }
        }).reduce((groups, item) => {
            if (groups.length > 0) {
                const foundIndex = groups.findIndex(x => x[0] == item.date.valueOf())
                if (foundIndex != -1) {
                    groups[foundIndex][1] += 1;
                } else {
                    groups.push([item.date.valueOf(), 1]);
                }
            } else {
                groups.push([item.date.valueOf(), 1]);
            }
            return groups;
        }, [] as number[][]),
        warnings: fullLogs?.filter(log => log.type == 'warning').map(log => {
            const date = moment(log.date)
            date.minute(0)
            date.second(0)
            date.millisecond(0)
            return { ...log, date: date }
        }).reduce((groups, item) => {
            if (groups.length > 0) {
                const foundIndex = groups.findIndex(x => x[0] == item.date.valueOf())
                if (foundIndex != -1) {
                    groups[foundIndex][1] += 1;
                } else {
                    groups.push([item.date.valueOf(), 1]);
                }
            } else {
                groups.push([item.date.valueOf(), 1]);
            }
            return groups;
        }, [] as number[][]),
        successes: fullLogs?.filter(log => log.type == 'success').map(log => {
            const date = moment(log.date)
            date.minute(0)
            date.second(0)
            date.millisecond(0)
            return { ...log, date: date }
        }).reduce((groups, item) => {
            if (groups.length > 0) {
                const foundIndex = groups.findIndex(x => x[0] == item.date.valueOf())
                if (foundIndex != -1) {
                    groups[foundIndex][1] += 1;
                } else {
                    groups.push([item.date.valueOf(), 1]);
                }
            } else {
                groups.push([item.date.valueOf(), 1]);
            }
            return groups;
        }, [] as number[][])
    }

    // Fill the holes
    const hours = Array(24).fill(0).map((val, index) => {
        return [moment(date, 'YYYY-MM-DD').set({ hour: index, minute: 0, second: 0, millisecond: 0 }).valueOf(), 0]
    })

    statSeries.errors = hours.map(hour => {
        const foundHour = statSeries.errors?.find(x => x[0] == hour[0]);
        return foundHour ? foundHour : hour;
    })

    statSeries.infos = hours.map(hour => {
        const foundHour = statSeries.infos?.find(x => x[0] == hour[0]);
        return foundHour ? foundHour : hour;
    })

    statSeries.warnings = hours.map(hour => {
        const foundHour = statSeries.warnings?.find(x => x[0] == hour[0]);
        return foundHour ? foundHour : hour;
    })

    statSeries.successes = hours.map(hour => {
        const foundHour = statSeries.successes?.find(x => x[0] == hour[0]);
        return foundHour ? foundHour : hour;
    })

    return { logs: logs ?? [], stats, statSeries, websites, domain: params.domain, date, filters, count: count ?? 0 }
}