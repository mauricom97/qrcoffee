export class Table {
    constructor(
        public readonly uuid: string,
        public number: number,
        public description?: string,
        public qrCode?: string,
        public companyUuid?: string,
    ) {
        if (!number) {
            throw new Error('Table number is required');
        }
    }
}