Array.prototype.includesOneof = function(object){
    console.log(object)
    console.log(typeof object)
    if(typeof object[0]!== "object"){
        console.log(typeof object)
        for(let i=0; i<object.length; i++){
            let exist = this.includes(object[i]);
            console.log(exist)
            
            if(this.includes(object[i])){
                return true;
            }
        }
        return false;
    }else{
        console.log(object.length)
        for(let i=0; i<object.length; i++){
            let exist = this.some((ele) => check(ele, object[i]));
            console.log(exist)
            if(exist == true){
                return true;
            }
        }
        return false;
    }
}
function check(item1, item2){
    console.log(item1)

    const key1 = Object.keys(item1);
    const key2 = Object.keys(item2);
    console.log(key1, key2);
    if(key1.length!== key2.length){
        console.log("hello");
        return false;
    }
    console.log(key1)
    for(let key of key1){
        console.log(item1[key])
        if(item1[key]!== item2[key]){
            return false;
        }
    }
    return true;
}

// const arr3 =[[1,22,33,4],[4,55,6,772]];

// console.log(arr3.includesOneof([[1,33,22,4]]));
const arr=[1, 2, 3, 4, 5, 6];
console.log(arr.includesOneof([2, 8, 10]));