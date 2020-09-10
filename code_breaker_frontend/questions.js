let questionBox = document.getElementById("question");
let answerBox = document.getElementById("answer");
let answer;

const questionGen = ()=>{
    let num1 = Math.floor(Math.random() * 10);
    let num2 = Math.floor(Math.random() * 10);
    let num3 = Math.floor(Math.random() * 10);
    let num4 = Math.floor(Math.random() * 10);

    questionBox.innerText = `${num1}${num2} + ${num3}${num4} = X`

    answer = Number(`${num1}${num2}`) + Number(`${num3}${num4}`)
    ansReset();
}

const ansReset = ()=>{
    answerBox.innerHTML = "X = "
}

const checkAns = ()=>{
    let submit = Number(answerBox.innerText.split('=')[1]);
    if(submit === answer){
        //increase score
        progress(getSeconds()+10, 120, $('#progressBar'));
        console.log('CONGRATS')
        questionGen();
    }else if(submit == ''){
        return
    }else{
        progress(getSeconds()-10, 120, $('#progressBar'));
        console.log("Wrong Answer")
        ansReset();
    }

}