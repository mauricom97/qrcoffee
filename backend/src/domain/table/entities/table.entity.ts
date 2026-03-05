export class Table {
    constructor(
        public readonly uuid: string,
        public number: number,
        public active?: boolean,
    ) {
        if (!number) {
            throw new Error('Table number is required');
        }
    }
}