import { SalesPoint } from "./sales-point";

export interface Deposit {
    id: string;
    salesPoint: SalesPoint;
    amount: BigInteger;
    depositDate: Date;
}
