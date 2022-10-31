export interface AddProductFacadeInputDto {
    id?: string
    name: string
    description: string
    purchasePrice: number
    stock: number
}

export interface CheckStockFaceInputDto {
    productId: string
}

export interface CheckStockFaceOutputDto {
    productId: string
    stock: number
}

export default interface ProductAdmFacadeInterface {
    addProduct(input: AddProductFacadeInputDto): Promise<void>
    checkStock(input: CheckStockFaceInputDto): Promise<CheckStockFaceOutputDto>
}
