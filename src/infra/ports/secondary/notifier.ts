/**
 * Secondary ports represent the interface between DOMAIN -> INFRASTRUCTURE
 */
export default interface Notifier {
  notify(message: string): void;
}
