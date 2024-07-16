export namespace Interface {
    export type Status = 'pending' | 'done'

    export interface Model {
        _id: string,
        name: string
        user?: string
        amount: number
        income: boolean // Determinar si es ingreso o egreso de dinero
        date: Date
        status: 'pending' | 'done'
    }
}

export interface Interface extends Interface.Model { }