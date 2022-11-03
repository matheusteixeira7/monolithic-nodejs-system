export interface addClientInputDTO {
    id?: string
    name: string
    email: string
    address: string
}

export interface addClientOutputDTO {
    id: string
    name: string
    email: string
    address: string
    createdAt: Date
    updatedAt: Date
}
