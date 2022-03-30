/* eslint-disable no-console */
// Console.log is used here to represent a notifier and should not be used in production
import Notifier from '../../ports/secondary/notifier';

export default class ConsoleNotifier implements Notifier {
  public notify(message: string): void {
    console.log(message);
  }
}
