import UseCaseInterface from '../../../@shared/usecase/use-case.interface'
import Transaction from '../../domain/transaction'
import PaymentGateway from '../../gateway/payment.gateway'
import {
    ProcessPaymentInputDTO,
    ProcessPaymentOutputDTO,
} from './process-payment.dto'

export default class ProcessPaymentUseCase implements UseCaseInterface {
    constructor(private readonly transactionRepository: PaymentGateway) {}

    async execute(
        input: ProcessPaymentInputDTO
    ): Promise<ProcessPaymentOutputDTO> {
        const transaction = new Transaction({
            orderId: input.orderId,
            amount: input.amount,
        })

        transaction.process()

        const persistTransaction = await this.transactionRepository.save(
            transaction
        )

        return {
            transactionId: persistTransaction.id.id,
            amount: persistTransaction.amount,
            status: persistTransaction.status,
            orderId: persistTransaction.orderId,
            createdAt: persistTransaction.createdAt,
            updatedAt: persistTransaction.updatedAt,
        }
    }
}
