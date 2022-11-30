export class EnumResponseModelCore<T>{
    Name: string = "";
    Value: T;
    IsSelected: boolean = false;
}

export default class EnumResponseModel extends EnumResponseModelCore<string>{

}