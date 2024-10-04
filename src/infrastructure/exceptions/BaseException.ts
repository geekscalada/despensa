export class BaseException extends Error {
    public readonly statusCode: number;
    public readonly customMessage: string | null;
  
    constructor(message: string, statusCode: number, customMessage?: string) {
      super(message);
      this.name = this.constructor.name;  
      this.statusCode = statusCode;
      this.customMessage = customMessage || null
  
      // Aquí capturamos la traza de la pila (stack trace) sin incluir la excepción base
      // para tener un stack trace más limpio
      Error.captureStackTrace(this, this.constructor);
    }
  }