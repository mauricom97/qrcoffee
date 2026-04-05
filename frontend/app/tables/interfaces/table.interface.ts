import { Comanda } from "../../orders/interfaces/order.interface";
export interface Mesa {
  uuid: string;
  number: number;
  description: string;
  comandas?: Comanda[];
  qrCode: string;
  /** ISO; presente quando o cliente chamou atendente pelo cardápio */
  attendantCallAt?: string | null;
  attendantCallMessage?: string | null;
}