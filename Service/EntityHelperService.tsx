import ProductItem from '../Entity/ProductItem';
import { format, parseISO } from 'date-fns';

export default class EntityHelperService {
  public static IsOfferPercentageAvaialble(productItem: ProductItem): boolean {
    return (
      productItem.Price !== productItem.OfferPrice &&
      productItem.OfferPercentage !== undefined &&
      productItem.OfferPercentage !== 0 &&
      !isNaN(productItem.OfferPercentage)
    );
  }
  public static IsItemAvaialble(productItem: ProductItem): boolean {
    return (
      productItem?.QuantityAvailableCount !== undefined &&
      productItem.QuantityAvailableCount > 0
    );
  }

  public static ConvertList<U, T>(
    OrderList: U[] | undefined,
    customConverstion: (obj: T) => void,
  ): T[] {
    var dataList: T[] = [];
    if (!OrderList) {
      return dataList;
    }

    OrderList.forEach((obj) => {
      var tempExt = (obj as unknown) as T;
      customConverstion(tempExt);
      dataList.push(tempExt);
    });
    return dataList;
  }
  public static ToDdMmmYyyy(date: Date): string {
    if(!date){
      return ""
    }
    return format(parseISO(date.toString()), 'dd-MMM-yyyy');
  }
  public static ToDdMmmYyyyHhMmSs(date: Date): string {
    if(!date){
      return ""
    }
    return format(parseISO(date.toString()), 'dd-MMM-yyyy hh:mm:ss a');
  }
}
