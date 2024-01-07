import { Agent } from "./agent";
import { Deposit } from "./deposit";

export interface SalesPoint {
    i: string
    name: string;
    address: string;
    dailyTransferLimit: BigInteger;
    phoneNumber: string;
    depositEntityHistory: Deposit[];
    agents: Agent[];
    createdAt: Date;
    updatedAt: Date;
}
