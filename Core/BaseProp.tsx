import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from '@react-navigation/native';




type ProfileScreenNavigationProp = StackNavigationProp<any, any>;

// export interface HomeScreenProps {
//   navigation: NavigationScreenProp<any,any>
// };


export default class BaseProp {
    navigation?: ProfileScreenNavigationProp;
}

