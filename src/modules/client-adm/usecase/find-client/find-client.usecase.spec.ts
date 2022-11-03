import Id from '../../../@shared/domain/value-object/id.value-object'
import Client from '../../domain/client.entity'
import FindClientUseCase from './find-client.usecase'

const client = new Client({
    id: new Id('1'),
    name: 'John Doe',
    email: 'doe@email.com',
    address: '123 Street',
})

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(client)),
    }
}

describe('find client usecase unit test', () => {
    it('should find a client', async () => {
        const repository = MockRepository()
        const usecase = new FindClientUseCase(repository)

        const input = {
            id: '1',
        }

        const result = await usecase.execute(input)

        expect(repository.find).toBeCalledWith(input.id)
        expect(result.id).toEqual(client.id.id)
        expect(result.name).toEqual(client.name)
        expect(result.email).toEqual(client.email)
        expect(result.address).toEqual(client.address)
        expect(result.createdAt).toEqual(client.createdAt)
        expect(result.updatedAt).toEqual(client.updatedAt)
    })
})
