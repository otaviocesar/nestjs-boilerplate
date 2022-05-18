import {
  GATEWAY_URL,
  GATEWAY_CLIENT_ID,
  GATEWAY_ACCESS_TOKEN,
} from '../../../environments/index';

export default class GatewayEntity {
  private api: string;

  private resource: string;

  private pathParam: string;

  private headers = {
    client_id: GATEWAY_CLIENT_ID,
    access_token: GATEWAY_ACCESS_TOKEN,
  };

  public getApi(): string {
    return this.api;
  }

  public setApi(value: string) {
    this.api = value;
  }

  public getResource(): string {
    return this.resource;
  }
  public setResource(value: string) {
    this.resource = value;
  }

  public getPathParam(): string {
    return this.pathParam;
  }

  public setPathParam(value: string) {
    this.pathParam = value;
  }

  public getHeaders() {
    return this.headers;
  }
  public setHeaderEmpreendimento(value) {
    this.headers['x-empreendimento'] = value;
  }

  public setTrackingId(value) {
    this.headers['original-tracking-id'] = value;
  }

  public getGetUrl(): string {
    return `${GATEWAY_URL}/${this.getApi()}/${this.getResource()}`;
  }

  public getPostUrl(): string {
    return `${GATEWAY_URL}/${this.getApi()}/${this.getResource()}`;
  }

  public getPutUrl(): string {
    return `${GATEWAY_URL}/${this.getApi()}/${this.getResource()}/${this.getPathParam()}`;
  }

  public getPatchUrl(): string {
    return `${GATEWAY_URL}/${this.getApi()}/${this.getResource()}/${this.getPathParam()}`;
  }
}
