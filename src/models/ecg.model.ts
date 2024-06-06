export interface EcgTransfer {
    id: string
    time_unix: string
    ecg: Array<number>
    create_date: string
    order_id: string
}