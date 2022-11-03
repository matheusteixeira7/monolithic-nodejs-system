import StoreCatalogFacade from '../facade/store-catalog.facade'
import ProductRepository from '../repository/sequelize/product.repository'
import FindAllProductsUseCase from '../usecase/find-all-products/find-all-products.usecase'
import FindProductUseCase from '../usecase/find-product/find-product.usecase'

export default class StoreCatalogFacadeFactory {
    static create(): StoreCatalogFacade {
        const repository = new ProductRepository()
        const findUseCase = new FindProductUseCase(repository)
        const findAllUseCase = new FindAllProductsUseCase(repository)

        const facade = new StoreCatalogFacade({
            findUseCase,
            findAllUseCase,
        })

        return facade
    }
}
