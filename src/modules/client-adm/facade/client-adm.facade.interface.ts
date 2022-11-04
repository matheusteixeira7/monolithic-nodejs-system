export interface addClientFacadeInputDTO {
    id?: string
    name: string
    email: string
    address: string
}

export interface FindClientFacadeInputDTO {
    id: string
}

export interface FindClientFacadeOutputDTO {
    id: string
    name: string
    email: string
    address: string
    createdAt: Date
    updatedAt: Date
}

export default interface ClientAdmFacadeInterface {
    add(input: addClientFacadeInputDTO): Promise<void>
    find(input: FindClientFacadeInputDTO): Promise<FindClientFacadeOutputDTO>
}
