/**
 * Функция, которая проверяет, является ли число целым используя побитовые операторы
 * @param {*} n
 * @returns {boolean}
 */
function isInteger(n) {
    if (isNaN(n)) return false;
    return (n | 0) === n;
}

/**
 * Функция, которая возвращает массив четных чисел от 2 до 20 включительно
 * @returns {number[]}
 */
function even() {
    let arr = [];
    for (let i = 2; i <= 20; i += 2)
        arr.push(i);
    return arr;
}

/**
 * Функция, считающая сумму чисел до заданного используя цикл
 * @param {*} n
 * @returns {number}
 */
function sumTo(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++)
        sum +=i;
    return sum;
}

/**
 * Напишите функцию, считающую сумму чисел до заданного используя рекурсию
 * @param {*} n
 * @returns {number}
 */
function recSumTo(n) {
    if (n === 1) return 1;
    return n + recSumTo(n - 1);
}

/**
 * Функция, считающая факториал заданного числа
 * @param {*} n
 * @returns {number}
 */
function factorial(n) {
    if (n < 0) return undefined;
    if (n === 0 || n === 1) return 1
    return n * factorial(n - 1);
}

/**
 * Функция, которая определяет, является ли число двойкой, возведенной в степень
 * @param {*} n
 * @returns {boolean}
 */
function isBinary(n) {
    if (n < 1) return false;
    while (n > 1){
        if (n % 2 !== 0) return false;
        n /= 2;
    }
    return true;
}

/**
 * Функция, которая находит N-е число Фибоначчи
 * @param {*} n
 * @returns {number}
 */
function fibonacci(n) {
    if (n < 0) return undefined;
    if (n === 0) return 0;
    if (n===1) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

/** Функция, которая принимает начальное значение и функцию операции
 * и возвращает функцию - выполняющую эту операцию.
 * Если функция операции (operatorFn) не задана - по умолчанию всегда
 * возвращается начальное значение (initialValue)
 * @param initialValue
 * @param operatorFn - (storedValue, newValue) => {operation}
 * @example
 * const sumFn =  getOperationFn(10, (a,b) => a + b);
 * console.log(sumFn(5)) - 15
 * console.log(sumFn(3)) - 18
 * @returns {function}
 */
function getOperationFn(initialValue, operatorFn) {
    return function (newValue){
        if (operatorFn)
            initialValue = operatorFn(initialValue, newValue)
        return initialValue;
    };
}

/**
 * Функция создания генератора арифметической последовательности.
 * При ее вызове, она возвращает новую функцию генератор - generator().
 * Каждый вызов функции генератора возвращает следующий элемент последовательности.
 * Если начальное значение не передано, то оно равно 0.
 * Если шаг не указан, то по дефолту он равен 1.
 * Генераторов можно создать сколько угодно - они все независимые.
 *
 * @param {number} start - число с которого начинается последовательность
 * @param {number} step  - число шаг последовательности
 * @example
 * const generator = sequence(5, 2);
 * console.log(generator()); // 5
 * console.log(generator()); // 7
 * console.log(generator()); // 9
 * @returns {function} - функция генератор
 */
function sequence(start = 0, step= 1) {
    let current = start;
    return function (){
        const value = current;
        current += step;
        return value;
    };
}

/**
 * Функция deepEqual, которая принимает два значения
 * и возвращает true только в том случае, если они имеют одинаковое значение
 * или являются объектами с одинаковыми свойствами,
 * значения которых также равны при сравнении с рекурсивным вызовом deepEqual.
 * Учитывать специфичные объекты(такие как Date, RegExp и т.п.) не обязательно
 *
 * @param {object} firstObject - первый объект
 * @param {object} secondObject - второй объект
 * @returns {boolean} - true если объекты равны(по содержанию) иначе false
 * @example
 * deepEqual({arr: [22, 33], text: 'text'}, {arr: [22, 33], text: 'text'}) // true
 * deepEqual({arr: [22, 33], text: 'text'}, {arr: [22, 3], text: 'text2'}) // false
 * @returns {boolean} - true если объекты равны, иначе false
 */
function deepEqual(firstObject, secondObject) {
    if (firstObject === secondObject) return true;

    if (Object.is(firstObject, NaN) && Object.is(secondObject, NaN))
        return true;

        if (firstObject == null || secondObject == null ||
        typeof firstObject !== 'object' || typeof secondObject !== 'object') {
        return false;
    }

    const key1 = Object.keys(firstObject);
    const key2 = Object.keys(secondObject);

    if (key1.length !== key2.length) return false;

    for (let key of key1) {
        // Проверяем наличие ключа в обоих объектах и рекурсивно сравниваем значения
        if (!key2.includes(key) || !deepEqual(firstObject[key], secondObject[key])) {
            return false;
        }
    }
    return true;
}

module.exports = {
    isInteger,
    even,
    sumTo,
    recSumTo,
    factorial,
    isBinary,
    fibonacci,
    getOperationFn,
    sequence,
    deepEqual,
};
