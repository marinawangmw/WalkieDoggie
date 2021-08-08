export class WalkieDoggieAPIError extends Error {
    constructor({ message = 'Error at Backend API call', metadata }) {
        super(message);
        this.name = this.constructor.name;
        this.metadata = metadata;
    }
}