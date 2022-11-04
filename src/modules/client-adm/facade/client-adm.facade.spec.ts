import { Sequelize } from 'sequelize-typescript'
import ClientAdmFacadeFactory from '../factory/client-adm.facade.factory'
import { ClientModel } from '../repository/sequelize/client.model'

describe('client adm facade test', () => {
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

    it('should create a model', async () => {
        const facade = ClientAdmFacadeFactory.create()

        const input = {
            id: '1',
            name: 'John Doe',
            email: 'x@x.com',
            address: 'address 1234',
        }

        await facade.add(input)

        const client = await ClientModel.findOne({
            where: { id: input.id },
        })

        expect(client).not.toBeNull()
        expect(client?.id).toBe(input.id)
        expect(client?.name).toBe(input.name)
        expect(client?.email).toBe(input.email)
        expect(client?.address).toBe(input.address)
    })

    it('should find a client', async () => {
        const facade = ClientAdmFacadeFactory.create()

        const input = {
            id: '1',
            name: 'John Doe',
            email: 'x@x.com',
            address: 'address 1234',
        }

        await facade.add(input)

        const client = await facade.find({ id: input.id })

        expect(client).not.toBeNull()
        expect(client.id).toBe(input.id)
        expect(client.name).toBe(input.name)
        expect(client.email).toBe(input.email)
        expect(client.address).toBe(input.address)
    })
})
