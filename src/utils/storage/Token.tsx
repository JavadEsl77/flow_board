import Storage from "./Storage";

enum Local {
  ACCESS_TOKEN = "access_token",
}

export default class Token extends Storage<Local> {
  private static instance?: Token;

  private constructor() {
    super();
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new Token();
    }
    return this.instance;
  }

  public getAccessToken() {
    return this.get(Local.ACCESS_TOKEN);
  }

  public setAccessToken(accessToken: string) {
    this.set(Local.ACCESS_TOKEN, accessToken);
  }

  public clear() {
    this.clearItems([Local.ACCESS_TOKEN]);
  }
}
