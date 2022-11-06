import Id from '../../../@shared/domain/value-object/id.value-object'
import Transaction from '../../domain/transaction'
import ProcessPaymentUseCase from './process-payment'

const transaction = new Transaction({
    id: new Id('1'),
    amount: 100,
    orderId: '1',
    status: 'approved',
})

const MockRepository = () => {
    return {
        save: jest.fn().mockReturnValue(Promise.resolve(transaction)),
    }
}

const transaction2 = new Transaction({
    id: new Id('1'),
    amount: 50,
    orderId: '1',
    status: 'rejected',
})

const MockRepositoryRejected = () => {
    return {
        save: jest.fn().mockReturnValue(Promise.resolve(transaction2)),
    }
}

describe('Process Payment usecase unit test', () => {
    it('should approve a transaction', async () => {
        const paymentRepository = MockRepository()
        const usecase = new ProcessPaymentUseCase(paymentRepository)
        const input = {
            orderId: '1',
            amount: 100,
        }

        const result = await usecase.execute(input)

        expect(result.transactionId).toBe(transaction.id.id)
        expect(paymentRepository.save).toHaveBeenCalled()
        expect(result.status).toBe('approved')
        expect(result.amount).toBe(100)
        expect(result.orderId).toBe('1')
        expect(result.createdAt).toStrictEqual(transaction.createdAt)
        expect(result.updatedAt).toStrictEqual(transaction.updatedAt)
    })

    it('should decline a transaction', async () => {
        const paymentRepository = MockRepositoryRejected()
        const usecase = new ProcessPaymentUseCase(paymentRepository)
        const input = {
            orderId: '1',
            amount: 50,
        }

        const result = await usecase.execute(input)

        expect(result.transactionId).toBe(transaction2.id.id)
        expect(paymentRepository.save).toHaveBeenCalled()
        expect(result.status).toBe('rejected')
        expect(result.amount).toBe(50)
        expect(result.orderId).toBe('1')
        expect(result.createdAt).toStrictEqual(transaction2.createdAt)
        expect(result.updatedAt).toStrictEqual(transaction2.updatedAt)
    })
})
