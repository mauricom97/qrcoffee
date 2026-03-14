import { Comanda } from "../../orders/interfaces/order.interface";
export interface Mesa {
  uuid: string;
  number: number;
  description: string;
  comandas?: Comanda[];
  qrCode: string;
}