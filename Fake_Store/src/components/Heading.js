import { View, Text, StyleSheet } from "react-native";

function Heading({title}) {
    return(
        <View style={styles.headingContainer}>
            <Text style={styles.heading} >{title}</Text>
        </View>
    )
}

export default Heading;

const styles = StyleSheet.create({
    headingContainer: {
        margin: 20,
       padding: 20,
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: 'blue',
        justifyContent:'center'
      }, 
      heading: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
      },
})