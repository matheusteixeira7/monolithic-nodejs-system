import UseCaseInterface from '../../../@shared/usecase/use-case.interface'
import ClientGateway from '../../gateway/client.gateway'
import {
    FindClientInputDTO,
    FindClientOutputDTO,
} from './find-client.usecase.dto'

export default class FindClientUseCase implements UseCaseInterface {
    private _repository: ClientGateway

    constructor(repository: ClientGateway) {
        this._repository = repository
    }

    async execute(input: FindClientInputDTO): Promise<FindClientOutputDTO> {
        const result = await this._repository.find(input.id)

        return {
            id: result.id.id,
            name: result.name,
            email: result.email,
            address: result.address,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt,
        }
    }
}
