import React , {useState} from "react";
import { TextInput, View, Text, TouchableOpacity, Vibration , Pressable , Keyboard , FlatList} from "react-native";
import ResultIMC from "./ResultIMC";
import styles from "./style";


export default function Form(){

    const [height, setHeight] = useState(null);
    const [weight, setWeight] = useState(null);
    const [messageIMC, setmessageIMC] = useState(""); // Mensagem que contem o resultado , começa vazio mas podemos adicionar mensagem inicial.
    const [imc, setIMC] = useState(null); // valor do IMC em numero
    const [textButton, setTextButton] = useState("Calculate your IMC"); //Botão que acionará o calculo
    const [imcList, setimcList] = useState([]); //Lista com todos os imc´s calculados


    // LIDAR COM ERRO (PARTE 1)
    // Para lidar com o erro de não termos inserido nenhum dado em height e weight podemos mostrar a mensagem mas melhor ainda é aplicar outra coisa, assim:
    const [errorMessage,seterrorMessage] = useState(null);




    // LIDAR COM ERRO (PARTE 2)
    // Criamos uma função para verificar se existe valor de IMC calculado e lançar mensagem de erro caso nao haja.
    function verificationIMC(){
        if(imc == null){
            // Aqui para vibrar chamamos a API do react native "Vibration" e o método "vibrate", é um método definido pelo react native
            Vibration.vibrate();
            seterrorMessage("Required data*")}
    }
    



    // [Calculo para saber o indice de IMC é: altura x altura a dividir por peso]
    // Vamos querer que nos retorne o resultado com (toFixed) que é para vir com 2 casas decimais apenas.
    function CalculatorIMC(){
        // No IOS o teclado não aparece com ponto, portanto temos de formatar aqui para quando digitarem virgula, formate para ponto.
        let heightFormat = height.replace(",",".")
       let totalImc = ((weight / (heightFormat * heightFormat)).toFixed(2))
       // Para inserir os resultados num array:
        //setimcList((array) => [...array, {id: new Date().getTime(), imc: totalImc}] )
        setimcList((array) => [...array, {id: Math.floor(Math.random * 100), imc: totalImc}] )
       // Depois definimos que o nosso setIMC é a variável do calculo
       setIMC(totalImc)
    }
    



    //Caso os valores tiverem sido preenchidos ele valida, caso contrário temos de avisar o usuário para preencher os dados de altura e peso.
    //Aqui com a condição é: Caso os valores de height e weight sejam diferentes de null, ou seja, estão preenchidos... Chama a função CalculatorIMC() que fará o calculo que depois nos dá o resultado.
    function ValidationIMC(){
        if(height != null && weight != null){
            //  **   CASO HAJA VALORES  **  //
            CalculatorIMC() // Função do calculo de IMC
            setHeight(null) // Reset de height para que se faça depois um novo calculo
            setWeight(null) // Reset de weight para que se faça depois um novo calculo
            setmessageIMC("Your IMC is:") // Mensagem para apresentar o resultado
            setTextButton("Try again?") // Botão com mensagem para voltar a fazer o calculo de IMC.
            Keyboard.dismiss() // Adicionei isto sozinho para que o teclado desapareca depois de clicar no botão

            seterrorMessage(null) //LIDAR COM ERRO (PARTE 3) - Para mudar o estado da mensagem de erro, serve pra limpar caso tenha sido lançado um erro antes.
        }
        else{
        //  **   CASO NAO HAJA VALORES  **  //
        // LIDAR COM ERRO(PARTE 4):
        // Chamar função de verificação se o valor de IMC é nulo e mensagem de erro caso seja.
        verificationIMC() //Verifica se há os valores de IMC
        Keyboard.dismiss() // Adicionei isto sozinho para que o teclado desapareca depois de clicar no botão
        setIMC(null) // caso o peso e altura sejam nulos, colocamos o imc como nulo também para que não haja resposta de possiveis calculos anteriores
        setTextButton("Calculate your IMC") // Para voltar a apresentar texto no botão
        setmessageIMC("Please insert your height and weight") // Para apresentar mensagem
        }
    }


    return(
        // O que fizemos aqui foi:
        // Se o resultado do IMC for nulo mostra o formulário, caso contrário... Mostra só o resultado.
        <View style={styles.formContent}>
            {imc == null ?
        <Pressable onPress={Keyboard.dismiss} style={styles.form}>        
                <Text style={styles.formLabel}>Height</Text>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                <TextInput style= {styles.input}
                onChangeText={setHeight}
                value={height}
                placeholder="Ex. 1.72"
                keyboardType="numeric" //Tipo de keyboard
                />

                <Text style={styles.formLabel}>Weight</Text>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                <TextInput style= {styles.input}
                onChangeText={setWeight}
                value={weight}
                placeholder="Ex. 70"
                keyboardType="numeric"
                />

               <TouchableOpacity style={styles.buttonCalculator} onPress={() => ValidationIMC()}> 
               <Text style={styles.textButtonCalculator}>{textButton}</Text>               
               </TouchableOpacity>
               </Pressable>
               :
               <View style={styles.exibResult}>
                <ResultIMC messageResultImc={messageIMC} resultImc={imc}/>
                <TouchableOpacity style={styles.buttonCalculator} onPress={() => ValidationIMC()}> 
               <Text style={styles.textButtonCalculator}>{textButton}</Text>               
               </TouchableOpacity>
               </View>
                }
                <FlatList
                style={styles.listImcs}
                // Para ter os dados da lista metemos dentro de data que é onde leva os valores.
                // Básicamente indicamos que é o state imcList e adicionamos o método reverse para ter o ultimo valor calculado 1º na lista
                data={imcList.reverse()}
                // Depois temos de renderizar essa data...
                renderItem={ ({item}) =>{
                    return(
                        <Text style={styles.resultImcItem}>
                            <Text style={styles.textResultItemList}>IMC Result: </Text>
                            {item.imc}
                        </Text>
                        
                    )}}
                // Depois metemos isto para passar um ID unico:
                keyExtractor={(item) => { item.id}}
                // Esta propriedade em false serve para esconder a barra vertical que faz o scroll:
                showsVerticalScrollIndicator = {false}
                />
        </View>
    )
}

//NOTAS:
//O keyboardType indica qual o tipo de teclado que ele vai abrir
//No <ResultIMC> leva duas props com propriedades dinamicas.
//Vibration: Alerta com vibração 