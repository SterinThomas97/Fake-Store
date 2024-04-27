import { View, Text, FlatList, ActivityIndicator, StyleSheet, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { fetchCategories } from "../model/data";
import Loading from "../components/Loading";
import Heading from "../components/Heading";
import { useNavigation } from '@react-navigation/native';

function CategoryScreen() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigation = useNavigation();
    
    useEffect(() => {
        const loadCategories = async () => {
            const data = await fetchCategories();
            setCategories(data);
            setLoading(false);
        };   

        loadCategories();
    }, []);

    if (loading) {
        return (
          <Loading />
        );
    }
    
    function categoryHandler(item) {
      console.log("before",item);
      navigation.navigate("ProductListScreen", {category : item});
    }

    const display = ({item}) => (
      <Pressable onPress={() => categoryHandler(item)}>
        {
          ({pressed}) => (
            <View style={[styles.categoryContainer, {backgroundColor: pressed ? '#ddd': '#f7f7f5'}]}>
              <Text style={styles.category}>{item.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ')}</Text>
            </View>
          )
        } 
        
      </Pressable>
      
    );

    return (
      
        <View style={styles.container}>
          <Heading title="Categories"/>
          
            <FlatList
                data={categories}
                renderItem={display}
                keyExtractor={(category) => category}
              />
          
        </View>
      );
}


export default CategoryScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      },
      headingContainer: {
        marginTop: 90,
        paddingHorizontal: 140,
        paddingVertical: 20,
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: 'blue',
      }, 
      heading: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
      },
      categoryContainer: {
        marginBottom: 5,
        paddingHorizontal:130,
        paddingVertical: 18,
        marginTop: 25,
        marginBottom: 75,
        marginHorizontal:25,
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: '#edeff2',
        borderRadius: 10,
        elevation: 4,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: {width : 0, height : 2},
        shadowRadius: 10,
       
      },
      category: {
        fontSize: 18,
        
        fontWeight:'400'
      },
})