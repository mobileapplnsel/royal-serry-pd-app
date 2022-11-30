import React from 'react';
import { ScrollView, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import ProductItemShowCase from './ProductItemShowCase';

import { View } from 'native-base';
import { ProductItems } from '../../Entity/ProductItems';
 


export default function ProductItemHorizentalShowCasePage(props) {
    const { ProductItemList } = props;
    var tempProductItemList = (ProductItemList || []) as ProductItems[];
    return (
        <View style={styles.container}>
        <FlatList
            data={tempProductItemList}
            horizontal={true}
            keyExtractor={item=>item.ProductItemId}
            renderItem={({ item }) => {
                  return <ProductItemShowCase {...props} ProductItem={item} />
            }}/>    
        </View> 
    )
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 225,  
        borderWidth: 0
    },
})  