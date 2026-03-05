import { Comanda } from "../../orders/interfaces/order.interface";
export interface Mesa {
  id: number;
  numero: number;
  descricao: string;
  comandas: Comanda[];
  qrCode: string;
}