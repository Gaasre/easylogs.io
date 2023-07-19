export interface Website {
    id: string
    created_at: Date
    domain: string
    user_id: string
}

export interface WebsiteWithStats {
    domain: string
    info_count?: number
    warning_count?: number
    error_count?: number
    success_count?: number
}