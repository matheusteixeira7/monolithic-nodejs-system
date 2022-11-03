import FindAllProductsUseCase from '../usecase/find-all-products/find-all-products.usecase'
import FindProductUseCase from '../usecase/find-product/find-product.usecase'
import StoreCatalogFacadeInterface, {
    FindAllStoreCatalogFacadeOutputDTO,
    FindStoreCatalogFacadeInputDTO,
    FindStoreCatalogFacadeOutputDTO,
} from './store-catalog.facade.interface'

export interface UseCaseProps {
    findUseCase: FindProductUseCase
    findAllUseCase: FindAllProductsUseCase
}

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface {
    private readonly _findUseCase: FindProductUseCase
    private readonly _findAllUseCase: FindAllProductsUseCase

    constructor(props: UseCaseProps) {
        this._findUseCase = props.findUseCase
        this._findAllUseCase = props.findAllUseCase
    }

    async find(
        id: FindStoreCatalogFacadeInputDTO
    ): Promise<FindStoreCatalogFacadeOutputDTO> {
        return this._findUseCase.execute(id)
    }
    async findAll(): Promise<FindAllStoreCatalogFacadeOutputDTO> {
        return await this._findAllUseCase.execute()
    }
}
