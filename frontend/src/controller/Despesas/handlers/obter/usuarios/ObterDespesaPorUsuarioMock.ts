import type { IDespesas } from "@/views/despesas/types";

export const mockDespesas: IDespesas[] = [
  {
    "replicar": false,
    "id": "a0dac9f31a8df18574c1d695e566c0de",
    "nome": "aluguel",
    "vencimento": "2024-11-08T23:12:55.142Z",
    "recorrente": "2",
    "frequencia": "1",
    "meses": [
      {
        mes: 11,
        "valor": "200.00",
        "ano": 2024,
        "status": "2",
        "descricao": "aluguel",
        "despesaId": "cd0bbbb4140652972c654a3729d55319",
        "vencimento": "2024-11-08T23:12:55.142Z",
        "observacao": ""
      }
    ],
    "customerId":  "ae77fa5b2fc1d3fa8b42194638f7d938"
  },
  {
    "replicar": false,
    "id": "c18e401fc03a285c361a37a77a16bce4",
    "nome": "luz",
    "recorrente": "1",
    "frequencia": "1",
    "vencimento": "2024-11-08T03:00:00.000Z",
    "meses": [
      {
        mes: 11,
        "ano": 2024,
        "descricao": "luz",
        "despesaId": "22def70c332b58ab1d5b45c2b28315f0",
        "observacao": "",
        "status": "2",
        "valor": "150.00",
        "vencimento": "2024-11-08T03:00:00.000Z"
      }
    ],
    "customerId": "ae77fa5b2fc1d3fa8b42194638f7d938"
  }
]