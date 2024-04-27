import { StyleSheet, View, Text,  Image } from "react-native";

function ProductItem({product}) {
    return(
        <View style={styles.productContainer}>
                <View style={styles.productImageContainer}>
                    <Image source={{uri: product.item.image}} style={styles.image}/>
                </View>
                <View style={styles.productDetails}>
                    <View style={styles.productTitle}>
                        <Text>{product.item.title}</Text>
                    </View>
                    <View>
                        <Text>Price: ${product.item.price}</Text>
                    </View>
                </View> 
        </View>
    )
}

export default ProductItem;

const styles = StyleSheet.create({
    productContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 20,
        padding: 10,
        borderColor: 'black',
        borderWidth: 1,
        marginBottom: 20,
        backgroundColor: 'white'
      },
      productImageContainer: {
        marginRight: 10
      },
      productDetails: {
        flex: 1
      },
      productTitle: {
        marginBottom: 10
      },
      image: {
        height: 50,
        width: 50,
        borderColor: 'black',
        borderWidth: 1
      }
})