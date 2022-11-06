import AggregateRoot from '../../@shared/domain/entity/aggregate-root.interface'
import BaseEntity from '../../@shared/domain/entity/base.entity'
import Id from '../../@shared/domain/value-object/id.value-object'

type TransactionProps = {
    id?: TransactionId
    amount: number
    orderId: string
    status?: string
    createdAt?: Date
    updatedAt?: Date
}

export class TransactionId extends Id {
    constructor(value: string) {
        super(value)
    }
}

export default class Transaction extends BaseEntity implements AggregateRoot {
    private _amount: number
    private _orderId: string
    private _status: string

    constructor(props: TransactionProps) {
        super(props.id)
        this._amount = props.amount
        this._orderId = props.orderId
        this._status = props.status || 'pending'
    }

    validate(): void {
        if (this._amount <= 0) {
            throw new Error('Amount must be greater than 0')
        }
    }

    approve(): void {
        this._status = 'approved'
    }

    reject(): void {
        this._status = 'rejected'
    }

    process(): void {
        if (this._amount >= 100) {
            this.approve()
        } else {
            this.reject()
        }
    }

    get amount(): number {
        return this._amount
    }

    get orderId(): string {
        return this._orderId
    }

    get status(): string {
        return this._status
    }
}
