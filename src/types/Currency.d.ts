export type Currency = {
    shortname: string | undefined,
    name: string,
    capitalize: string,
    exchange_capacity: string,
    price: number,
    course: {
        weekly: string,
        daily: string
    }
}