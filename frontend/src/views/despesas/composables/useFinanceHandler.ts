import { formatCurrency } from "@/common/utils/utils";

export default function useFinanceHandler() {

    const sumTotal = <T extends { valor: string | number }>(lista: T[]): number => {
        return lista.reduce((acc, item) => acc + Number(item.valor), 0);
    };
    
    const defineStatus = (value: string) => {
        switch (value) {
            case "1":
                return { name: 'task_alt', color: '#17dd6f', title: 'Pago' };
            case "2":
                return { name: 'close', color: 'red', title: 'Pendente de pagamento' };       
            default:
                return { name: '', color: '', title: '' };
        }
    }

    const obterTotal = <T extends { valor: string | number }>(lista: T[]): string => {
        const totalReais = sumTotal(lista);
        return formatCurrency(totalReais);
    };

    return {
        defineStatus,
        obterTotal
    }
}