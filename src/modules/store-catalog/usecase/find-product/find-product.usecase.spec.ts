import Id from '../../../@shared/domain/value-object/id.value-object'
import Product from '../../domain/product.entity'
import FindProductUseCase from './find-product.usecase'

const product = new Product({
    id: new Id('1'),
    name: 'Product 1',
    description: 'Description 1',
    salesPrice: 100,
})

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
    }
}

describe('Find a product usecase unit test', () => {
    it('should find a product', async () => {
        const repository = MockRepository()
        const usecase = new FindProductUseCase(repository)
        const input = {
            id: '1',
        }

        const result = await usecase.execute(input)
        expect(repository.find).toHaveBeenCalled()
        expect(result.id).toBe('1')
        expect(result.name).toBe('Product 1')
        expect(result.description).toBe('Description 1')
        expect(result.salesPrice).toBe(100)
    })
})
