export default interface Interface {
    _id: string,
    name: string
    amount: number
    income: boolean // Determinar si es ingreso o egreso de dinero
    date: Date
}