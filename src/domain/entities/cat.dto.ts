export default class CatDto {
  /**
   * Data coming from or sent back to the client (frontend/other)
   * Used onl in the APPLICATION layer
   */
  constructor(public name: string, public gender: string) {}
}
