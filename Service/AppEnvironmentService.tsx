
export class AppEnvironmentService {
  public static GetCurrentApp(): string {
    //TODO:switch on app release ,Production
    return "royalserry";
  }
  public static IsDeug(): boolean {
    //TODO:switch on app release ,Production
    return true;
  }
}
