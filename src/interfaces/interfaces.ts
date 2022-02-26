export interface IForm {
    name: string,
    email: string,
    dob: string,
    amount: number,
    cardNum: string,
    cardExpiry: string,
    itemDesc: string
}

export interface IItem {
    userId: number,
    id: number,
    title: string,
    completed: boolean
}