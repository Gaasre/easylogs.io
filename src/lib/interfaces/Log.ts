export interface ILog {
    id: string
    value: string
    website: string
    date: Date
    namespace?: string
    type: 'error' | 'info' | 'warning' | 'success';
}