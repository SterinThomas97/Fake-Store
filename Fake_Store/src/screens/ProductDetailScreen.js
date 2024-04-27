import { View, Text, Image, StyleSheet } from "react-native";
import Heading from "../components/Heading";
import AppButton from "../components/AppButton";
import { useNavigation } from '@react-navigation/native';

function ProductDetailScreen({route}) {

    const {productItem} = route.params;
    const navigation = useNavigation();

    function backButtonHandler() {
        navigation.goBack()
   }
    return(
        <View style={styles.productDetail}>
            <Heading title="Product Details"/>
            <View style={styles.mainContainer}>
                <View style={styles.imageContainer}>
                        <Image source={{uri: productItem.item.image}} style={styles.image} />
                </View>
                <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>{productItem.item.title}</Text>
                </View>
                <View style={styles.valueContainer}>
                        <View>
                            <Text style={styles.valueColor}>Rate: {productItem.item.rating.rate}</Text>
                        </View>
                        <View>
                            <Text style={styles.valueColor}>Sold: {productItem.item.rating.count}</Text>
                        </View>
                        <View>
                            <Text style={styles.valueColor}>Price : ${productItem.item.price}</Text>
                        </View>
                </View>
                <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <AppButton icon="backspace" onPress={backButtonHandler} color="white" size={20} title="Back"/>
                        </View>
                        <View style={styles.button}>
                            <AppButton icon="cart"  color="white" size={20} title="Add to Cart"/>
                        </View>
                </View>
                <View>
                        <View style={styles.descriptionContainer}>
                            <Text style={styles.description}>Description:</Text>
                        </View>
                        <View style={styles.descriptionBox}>
                            <Text style={styles.descriptionContent}>{productItem.item.description}</Text>
                        </View>
                </View>
            </View>  
            

        </View>
    )
}

export default ProductDetailScreen;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        marginBottom: 5,
    },
    image:{
       
        width: 400,
        height: 200,
        borderWidth:1,
        borderColor: 'black'
    },
    valueColor:{
        color:'white',
        margin: 10,
        fontWeight: 'bold'
    },
    valueContainer:{
        margin:15,
        flexDirection: 'row',
        backgroundColor: '#6face8',
        justifyContent: 'space-evenly'
    },
    imageContainer: {
        
        margin:15
       
    },
    productDetail: {
        flex: 1
    },
    titleContainer: {
        marginHorizontal: 20
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center'
    },
    button: {
        backgroundColor: '#208bf5',
        padding: 10,
        borderRadius: 8
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems:'center',
    },
    description: {
        fontWeight: 'bold',
        fontSize: 20
    },
    descriptionContainer: {
        margin: 15
    },
    descriptionBox: {
        backgroundColor: 'white',
        marginHorizontal: 15,
    },
    descriptionContent: {
        fontSize: 15,
        margin: 5
    }
    
})