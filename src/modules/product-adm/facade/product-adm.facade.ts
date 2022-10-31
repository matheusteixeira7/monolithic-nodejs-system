import UseCaseInterface from '../../@shared/usecase/use-case.interface'
import ProductAdmFacadeInterface, {
    AddProductFacadeInputDto,
    CheckStockFaceInputDto,
    CheckStockFaceOutputDto,
} from './product-adm.facade.interface'

export interface UseCasesProps {
    addUseCase: UseCaseInterface
    stockUseCase: UseCaseInterface
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {
    private _addUsecase: UseCaseInterface
    private _checkStockUsecase: UseCaseInterface

    constructor(usecasesProps: UseCasesProps) {
        this._addUsecase = usecasesProps.addUseCase
        this._checkStockUsecase = usecasesProps.stockUseCase
    }

    addProduct(input: AddProductFacadeInputDto): Promise<void> {
        return this._addUsecase.execute(input)
    }
    checkStock(
        input: CheckStockFaceInputDto
    ): Promise<CheckStockFaceOutputDto> {
        return this._checkStockUsecase.execute(input)
    }
}
