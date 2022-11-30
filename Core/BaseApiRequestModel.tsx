import SessionHelper from "./SessionHelper";

export default class BaseApiRequestModel {
    SessionToken: string = "";
    EntityId: string = "";

    public static async GetRequestModel(): Promise<BaseApiRequestModel> {
        var model = new BaseApiRequestModel();
        var session = await SessionHelper.GetUserSession();
        if (session) {
            model.SessionToken = session.ApiSessionToken;
        }

        return model;
    }
}