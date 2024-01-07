export interface Account {
    accountCod: string;
    balance: BigInteger;
    annualAmountTransfer: BigInteger;
    createdAt: Date;
    ownerId: string;
    accountType: string;
}
