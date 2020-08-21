const firstRow = 'мама мыла раму';
const secondRow = 'собака друг человека';

function getRow(...args) { //любое количество аргументов
  let i, arrayStore = 0, arrayResult = [0];//чтобы не было undefined при первой пустой строке в Math.max

  args.forEach(function(item, index){ //подсчитываем кол-во символов 'а' для всех входных переменных-строк
    for (i=0; i<=item.length; i++){
     if(item.charAt(i)==='а'){
       arrayResult[index]=++arrayStore;
     }
    }
    arrayStore = 0;
  }) 

  return args[arrayResult.indexOf(Math.max(...arrayResult))]; // возвращаем строку с где больше 'а'
}

/*WARNING! При одинаковом количестве символов 'а' выведется младшая по индексу строка*/
console.log(getRow(firstRow, secondRow)); // мама мыла раму


//В ТЗ идёт логическая привязка к номерному порядку симлволов строки
//Решаем относительно этого порядка
function formattedPhone(phone) {
  let strArr = phone.split('');
  strArr.splice(2, 0, ' ');
  strArr.splice(3, 0, '(');
  strArr.splice(7, 0, ')');
  strArr.splice(8, 0, ' ');
  strArr.splice(12, 0, '-');
  strArr.splice(15, 0, '-');
  phone = strArr.join('');
  return phone;
}

console.log(formattedPhone('+71234567890')); // +7 (123) 456-78-90