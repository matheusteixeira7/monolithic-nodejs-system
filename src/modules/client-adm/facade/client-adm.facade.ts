import UseCaseInterface from '../../@shared/usecase/use-case.interface'
import ClientAdmFacadeInterface, {
    addClientFacadeInputDTO,
    FindClientFacadeInputDTO,
    FindClientFacadeOutputDTO,
} from './client-adm.facade.interface'

export interface UseCaseProps {
    findUseCase: UseCaseInterface
    addUseCase: UseCaseInterface
}

export default class ClientAdmFacade implements ClientAdmFacadeInterface {
    private _findUseCase: UseCaseInterface
    private _addUseCase: UseCaseInterface

    constructor(useCaseProps: UseCaseProps) {
        this._findUseCase = useCaseProps.findUseCase
        this._addUseCase = useCaseProps.addUseCase
    }

    async add(input: addClientFacadeInputDTO): Promise<void> {
        await this._addUseCase.execute(input)
    }
    async find(
        input: FindClientFacadeInputDTO
    ): Promise<FindClientFacadeOutputDTO> {
        return await this._findUseCase.execute(input)
    }
}
