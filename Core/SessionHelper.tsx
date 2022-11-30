
import AsyncStorage from '@react-native-community/async-storage'

import AppShowCaseSetting from "../Entity/AppShowCaseSetting";


export default class SessionHelper {

    public static SetSession(Customer: any) {
        AsyncStorage.setItem('User', JSON.stringify(Customer))
    }
    public static async GetSession() {
        var item = await AsyncStorage.getItem('User');
        if (!item) {
            return item as unknown as any;
        }
        return JSON.parse(item) as any;
    }

    public static SetAppShowcaseData(settings: AppShowCaseSetting[]) {
        AsyncStorage.setItem('AppShowCase', JSON.stringify(settings))
    }
    public static async GetAppShowcaseData() {
        var item = await AsyncStorage.getItem('AppShowCase');

        if (!item) {
            return [] as AppShowCaseSetting[];
        }

        return JSON.parse(item) as AppShowCaseSetting[];
    }
}
