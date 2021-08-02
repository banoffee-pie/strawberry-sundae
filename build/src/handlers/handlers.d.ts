export interface Handler {
    handle(command: string): void;
}
declare class Handlers {
    private readonly list;
    registerHandler(command: string, handler: Handler): void;
    selectHandler(command: string): Handler | null;
}
export declare const handlers: Handlers;
import './format';
export {};
