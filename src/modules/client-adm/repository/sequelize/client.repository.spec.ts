import { Sequelize } from 'sequelize-typescript'
import Id from '../../../@shared/domain/value-object/id.value-object'
import Client from '../../domain/client.entity'
import { ClientModel } from './client.model'
import ClientRepository from './client.repository'

describe('client adm repository test', () => {
    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        })

        sequelize.addModels([ClientModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it('should create a client', async () => {
        const client = new Client({
            id: new Id('1'),
            name: 'John Doe',
            email: 'x@x.com',
            address: '123 Main St',
        })

        const repository = new ClientRepository()
        await repository.add(client)

        const clientModel = await ClientModel.findOne({ where: { id: '1' } })

        expect(clientModel).not.toBeNull()
        expect(clientModel.id).toBe(client.id.id)
        expect(clientModel.name).toBe(client.name)
        expect(clientModel.email).toBe(client.email)
        expect(clientModel.address).toBe(client.address)
        expect(clientModel.createdAt).toStrictEqual(client.createdAt)
        expect(clientModel.updatedAt).toStrictEqual(client.updatedAt)
    })

    it('should find a client', async () => {
        const client = await ClientModel.create({
            id: '1',
            name: 'John Doe',
            email: 'x@x.com',
            address: '123 Main St',
            createdAt: new Date(),
            updatedAt: new Date(),
        })

        const repository = new ClientRepository()
        const result = await repository.find(client.id)

        expect(result.id.id).toEqual(client.id)
        expect(result.name).toEqual(client.name)
        expect(result.email).toEqual(client.email)
        expect(result.address).toEqual(client.address)
        expect(result.createdAt).toStrictEqual(client.createdAt)
        expect(result.updatedAt).toStrictEqual(client.updatedAt)
    })
})
