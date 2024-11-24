export namespace Interface {
    export type Status = 'pending' | 'done'

    export interface Model {
        _id: string,
        title: string,

        amount: number,
        interest_rate: number,

        status: Status,
        loan_installments: number,
        loan_installments_paid: number,

        user?: string
    }
}

export interface Interface extends Interface.Model { }