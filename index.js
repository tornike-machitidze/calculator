const input = document.querySelector('#input');
const numbers = document.querySelectorAll('.number');
const remove = document.querySelector('.delet');
const operKeys = document.querySelectorAll('.operation');
const equal = document.querySelector('.equal');


// array where inputed values accumuliate
let userInputArr = [];
// this var stores operation type
let operation = '';
// stores final result
let result = 0;

// these vars store if val1 or val2 in the array are negative
let val1Neg = '';
let val2Neg = '';




// become a input value 
numbers.forEach(number => {
    number.addEventListener('click', addValue);
});

//  allows to input only CORRECT numbers
function addValue(e){
   if(e.target.value === '0' && input.value === '0'){
    //    input.value = 0;
    return
   }else if(input.value === '0.' && e.target.value === '.'){
    //    input.value = '0.'; 
    return
   }else if(e.target.value === '.' && input.value === '0'){
    input.value += e.target.value;
   }else if(input.value.includes('.') === true && e.target.value === '.'){
        input.value = input.value
    }else if(input.value === '0'){
        input.value = e.target.value;
   }else{
       input.value += e.target.value
   }
}



// remove inputs
remove.addEventListener('click', delVals);
// delete value from array and from input filed
function delVals(){
    input.value = '';
    userInputArr = [];
    operation = '';
    val2Neg = '';
    val1Neg = '';
}






// give every operation keys event 
operKeys.forEach(key => key.addEventListener('click', makeOper));


// what does oper keys
function makeOper(e){
    // give negative signs to variables
        if( input.value === '' && e.target.value === '-' && val1Neg === '' || input.value === '' && e.target.value === '-' && userInputArr[0] == ''){
            val1Neg = '-'; 
        }else if(operation!== '' && e.target.value === '-' && userInputArr[0] != 0){
            val2Neg = '-'
        }else{
            // saves first input value in the userInputArr, as a number
        userInputArr.push(Number(input.value));
        // saves operation in the var operation
        operation = e.target.value
        // clears input value 
        input.value = '';
        }
}




// eqaul 

equal.addEventListener('click', answer);

function answer(){
    if(val1Neg){
        userInputArr[0] = -userInputArr[0]
    }
    // saves second value in the userInputArr as an operation key
     userInputArr.push(Number(input.value)); 
     if(val2Neg){
        userInputArr[1] = -userInputArr[1];
    }
     switch(operation){
        case '+': 
        result = userInputArr.reduce((sum, curr) => sum+=curr);
        break;
        case '-':
            result = userInputArr.reduce((sum, curr) => sum-=curr);
            break;
        case 'x':
            result = userInputArr.reduce((sum, curr) => sum*=curr);
            break;      
        case '/':
            if(userInputArr[0] == 0 || userInputArr[1] == 0){
                result = 'Error';
                input.value = result;
                userInputArr = [];
                operation = '';
            }else{
            result = userInputArr.reduce((sum, curr) => sum/=curr);
            input.value = result;
            userInputArr = [];
            operation = '';
            }
            break;     
        case '√':
            if(userInputArr < 0 || val1Neg || userInputArr[0] < 0){ 
                result = 'Error';
                break;
            }else {result = Math.sqrt(userInputArr[0]);}
            break;
        case '^':
            result = Math.pow(userInputArr[0], userInputArr[1]);
            break;
    }
    if(typeof result != 'number'){
        input.value = 'Error';
    }else if(!Number.isInteger(result) && String(result).length > 10){
        input.value = Math.round((result + Number.EPSILON) * 100) / 100;
        console.log(input.value);
        userInputArr = [];
        operation = '';
        val1Neg = '';
        val2Neg = ''; 
    }else if(Number.isInteger(result) && String(result).length > 10){
        input.value =  parseFloat(String(result).slice(0, 10));
        userInputArr = [];
        operation = '';
        val1Neg = '';
        val2Neg = '';
    }else{
        input.value =  result;
        userInputArr = [];
        operation = '';
        val1Neg = '';
        val2Neg = '';
    }
}














// what is main idea of code working

// there is only one array, user gives it two values exampl [2, 3];
// there is variable wich saves information about what type operation is between these values exaple '+'
// there are two variables and they save information about if values inside array will become negative or not exapl val1 = '-' val2 = ''
// equal sign gets information from these two variable and gives proper sign to each value   example [-val1, val2] so it returns array with right signs than
// and based on what is the operation gives these values proper peace of code '+' =>  -val1 + val2
// equal return result and input value  gets it value, result.toFixed(10);
// every var and array gets clear after equal 


// calculator can calculate only one operation each time 
// for example it cannot calculate 3+3/3=
// but its fine 3+3=6/3=2