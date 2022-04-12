export default class BadRequestException extends Error {
  constructor(message: string) {
    super(message);
  }
}
