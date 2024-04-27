import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
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
      console.log(item);
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
          
          
          <View style={styles.categoryList}>
            <FlatList
                  data={categories}
                  renderItem={display}
                  keyExtractor={(category) => category}
                />
          </View>
            
          
        </View>
      );
}


export default CategoryScreen;

const styles = StyleSheet.create({
    container: {
       flex: 1,
      },
    categoryList: {
      flex : 1,
      marginBottom: 5,
      marginTop: 20,
      borderBottomColor: 'black',
      borderBottomWidth: 1
    },
      categoryContainer: {
       padding:20,
       alignItems: 'center',
        marginBottom:60,
        marginHorizontal:25,
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: '#edeff2',
        borderRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: {width : 0, height : 2},
        shadowRadius: 10,
        overflow: 'hidden'
      },
      
      category: {
        fontSize: 18,
        
        fontWeight:'400'
      },
})