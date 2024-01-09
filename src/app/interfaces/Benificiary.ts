import { Client } from "./client";
import { Prospect } from "./prospect";

export interface Benificiary {

    id ?: string;
    firstName : string;
    lastName : string;
    phoneNumber : string;
    client : Client;
    prospect : Prospect;

}