import { StyleSheet } from "react-native";

const styles = StyleSheet.create( {
    formContent: {
        width:"100%",
        height:"100%",
        bottom:0,
        backgroundColor:"#ffffff",
        alignItems:"center",
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        marginTop:30
    },
    form: {
        width:"100%",
        height:"auto", //Colocando auto, ao colocar novos items ao conteudo ele ajusta.
        marginTop:30,
        padding:10
    },
    formLabel:{
        color:"#000000",
        fontSize:18,
        paddingLeft:20,
    }
});

export default styles;