import { View, Text, Image, StyleSheet, SafeAreaView } from "react-native";
import Heading from "../components/Heading";
import AppButton from "../components/AppButton";
import { useNavigation } from '@react-navigation/native';
import { fetchProduct } from "../model/data";
import Loading from "../components/Loading";
import { useState, useEffect } from "react";
import colors from "../constants/Colors";

function ProductDetailScreen({route}) {
    const {productItemId} = route.params;
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);

    const navigation = useNavigation();

    useEffect(() => {
        const loadProduct = async () => {
            const data = await fetchProduct(productItemId);
            setProduct(data)
            setLoading(false);
        };   
        loadProduct();
    }, []);

    if (loading) {
        return (
          <Loading/> 
        );
    }
    function backButtonHandler() {
        navigation.goBack()
   }
    return(
        <SafeAreaView style={styles.productDetail}>
            <Heading title="Product Details"/>
            <View style={styles.mainContainer}>
                <View style={styles.imageContainer}>
                        <Image source={{uri: product.image}} style={styles.image} />
                </View>
                <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>{product.title}</Text>
                </View>
                <View style={styles.valueContainer}>
                        <View>
                            <Text style={styles.valueColor}>Rate: {product.rating.rate}</Text>
                        </View>
                        <View>
                            <Text style={styles.valueColor}>Sold: {product.rating.count}</Text>
                        </View>
                        <View>
                            <Text style={styles.valueColor}>Price : ${product.price}</Text>
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
                            <Text style={styles.descriptionContent}>{product.description}</Text>
                        </View>
                </View>
            </View>  
            
        </SafeAreaView>
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
        borderColor: colors.borderColor
    },
    valueColor:{
        color: colors.valueColor,
        margin: 10,
        fontWeight: 'bold'
    },
    valueContainer:{
        margin:15,
        flexDirection: 'row',
        backgroundColor: colors.valueContainerColor,
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
        backgroundColor: colors.backButtonBackgroundColour,
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
        backgroundColor: colors.descriptionBoxColor,
        marginHorizontal: 15,
    },
    descriptionContent: {
        fontSize: 15,
        margin: 5
    }
    
})