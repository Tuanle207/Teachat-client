export const limitWordsInText = (text, length = 36) => {
    let result = '';
    
    if (text.length <= 36) {
        result = text;
    } else if (text[length] === ' ' || !text.includes(' ')) {
        result = text.substr(0, length);
    } else {
        let count=length;
        while (text[count] !== ' ') {
            count--;
        }
        result = text.substr(0, count);
    }

    result = text.length > 36 ? result + ' ...' : result; 
    return result;
}
/**
 * Parameter: An array has the format which contain just 2 types of element
 * Group these element into sub-group which contain a unique type of element and
 * keep order of these element 
 * example: [1,1,2,2,2,2,1,1,1,2,1] -> [ [1,1], [2,2,2,2], [1,1,1], [2] , [1] ]
 */
export const groupArrayItems = (arr) => {
    if (arr.length <= 1) {
        return [arr];
    }
    let lastItem = arr[0];
    let temp = [lastItem];
    const result = [];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i].sender === lastItem.sender) {
            temp.push(arr[i]);
            if (i === arr.length - 1) {
                result.push(temp);
            }
            continue;
        }
        if (arr[i].sender !== lastItem.sender) {
            lastItem = arr[i];
            result.push(temp);
            temp = [lastItem];
        }
        if (i === arr.length - 1) {
            result.push(temp);
        }
    }
    return result;
}

const compareDate = (chatA, chatB) => {
    if (!chatA.latestMessage && !chatB.latestMessage) {
        return 0;
    }
    if (!chatA.latestMessage) {
        return 1;
    }
    if (!chatB.latestMessage) {
        return -1;
    }
    const date1 = new Date(chatA.latestMessage.sentAt);
    const date2 = new Date(chatB.latestMessage.sentAt);
    if (date1 > date2) {
        return -1;
    }
    if (date1 < date2) {
        return 1;
    }
    return 0;
}

export const ObjectToArray = (obj) => {
    return Object.keys(obj).map(el => obj[el]);
}

export const sortArrayOfObjectByDate = (arr) => {
    return arr.sort(compareDate)
}

export const onChangeSubmit = (onChange, handleSubmit) => {
    return (event) => {
        onChange(event);
        setTimeout(()=>{
            handleSubmit();
        }, 100);
    }
}

export const isEmptyObject = (obj) => {
    return obj === null || obj === undefined || (Object.keys(obj).length === 0 && obj.constructor === Object);
}