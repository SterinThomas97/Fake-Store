import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import Heading from "../components/Heading";
import { useEffect, useState } from "react";
import { fetchProducts } from "../model/data";
import Loading from "../components/Loading";
import BackButton from "../components/BackButton";
import ProductItem from "../components/ProductItem";

const ProductListScreen = ({route}) => {
    
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

    const displayProductItems = (product) => (
        <ProductItem product={product} />
    )

    
    return (
        <View style={styles.root}>
             <Heading title={categoryItem}/>  
             <View style={styles.productList}>
                <FlatList
                    data={productItems}
                    renderItem={displayProductItems}
                    keyExtractor={(product) => product.id.toString()}
                />
             </View>
             <View style={styles.backButton}>
                <BackButton />
            </View>  
        </View>
       
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
        backgroundColor: 'blue',
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