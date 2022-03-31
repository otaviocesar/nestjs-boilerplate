export default class UserDto {
  /**
   * Data coming from or sent back to the client (frontend/other)
   * Used onl in the APPLICATION layer
   */
  constructor(public name: string, public email: string) {}
}
