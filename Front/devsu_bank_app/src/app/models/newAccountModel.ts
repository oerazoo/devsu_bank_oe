import { Account } from "./accountModel";

export interface NewAccount extends Omit<Account, 'id'> {

}
