import { StyleSheet, View, FlatList, Pressable, StatusBar, SafeAreaView } from "react-native";
import Heading from "../components/Heading";
import { useEffect, useState } from "react";
import { fetchProducts } from "../model/data";
import Loading from "../components/Loading";
import ProductItem from "../components/ProductItem";
import { useNavigation } from '@react-navigation/native';
import AppButton from "../components/AppButton";

const ProductListScreen = ({route}) => {
    const navigation = useNavigation();
    const { category } = route.params;
    const [productItems, setProductItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const categoryItem = category.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ')

    useEffect(() => {
        const loadProducts = async () => {
            const data = await fetchProducts(category);
            setProductItems(data);
            setLoading(false);
        };   
        loadProducts();
    }, [categoryItem]);

    if (loading) {
        return (
          <Loading />
        );
    }

    const productItemHandler = ({product}) => {
        navigation.navigate("ProductDetailScreen", {productItemId : product.item.id});
    }
    const displayProductItems = (product) => (
        <Pressable onPress={() => productItemHandler({product})}>
            <ProductItem product={product} />
        </Pressable>
    )

    function backButtonHandler() {
         navigation.goBack()
    }
    return (
        <SafeAreaView style={styles.root}>
             <StatusBar backgroundColor="transparent" translucent={true} />
             <Heading title={categoryItem}/>  
             <View style={styles.productList}>
                <FlatList
                    data={productItems} 
                    renderItem={displayProductItems}
                    keyExtractor={(product) => product.id.toString()}
                />
             </View>
             <View style={styles.backButton}>
                <AppButton icon="backspace" onPress={backButtonHandler} color="white" size={20} title="Back"/>
            </View>  
        </SafeAreaView>
       
    );
}


export default ProductListScreen;

const styles = StyleSheet.create({
    root:{
        flex: 1
    }, 
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      },
      backButton: {
        flex : 0.035,
        backgroundColor: '#208bf5',
        padding: 5,
        marginHorizontal: 170,
        marginBottom: 40,
        borderRadius: 8
      },
      productList:{
        flex : 1,
        marginBottom: 5,
        marginTop: 1,
        borderBottomColor: 'black',
        borderBottomWidth: 1
      }
      
})