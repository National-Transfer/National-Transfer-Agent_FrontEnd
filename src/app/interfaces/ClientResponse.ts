import { Account } from "./account";
import { Client } from "./client";

export interface ClientResponse extends Client{

    account ?: Account;
}