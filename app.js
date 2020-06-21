const balance=document.getElementById('balance')
const money_plus=document.getElementById('money-plus')
const money_minus = document.getElementById('money-minus')
const list = document.getElementById('list')
const form = document.getElementById('form')
const text = document.getElementById('text')
const amount = document.getElementById('amount')
console.log(text,amount)


// const dummyTransactions=[

//     {id:1,text:'flower',amount:-20},
//     { id: 2, text: 'salary', amount:20000 },
//      { id: 3, text: 'tv', amount: -12000 },
//       { id: 4, text: 'fridge', amount: -17000 }
// ]


const localStorageTransactions=JSON.parse(localStorage.getItem('transactions'))


let transactions=localStorage.getItem('transactions')!==null ?localStorageTransactions:[];

//add transactions
function addTransaction(e){
    e.preventDefault()

    if(text.value.trim()===''||amount.value.trim()===''){
        alert('please add a add a text or a number')
    }else{
        const transaction={
            id:generateID(),
            text:text.value,
            amount:+amount.value
        }
        transactions.push(transaction)

        addTransactionToDOM(transaction)
        updateValues()

        updateLocalStorage()

        text.value=''
        amount.value=''
    }
}
function generateID(){
    return Math.floor(Math.random()*1000000)
}
//genrate random id


//add transactions to DOM list
function addTransactionToDOM(transaction){
    //get sign
    const sign=transaction.amount<0?'-':'+'

    const item=document.createElement('li')

    //add class based value
    item.classList.add(transaction.amount<0?'minus':'plus')
 
    item.innerHTML=`
      ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
      <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `

    list.appendChild(item)


}

//updates the balance,income and expense
function updateValues(){
    const amounts=transactions.map((transaction)=>{
        return transaction.amount
    })

    const total=amounts.reduce((acc,item)=>{
        return acc+=item
    },0).toFixed(2)

    console.log(total)

    const income=amounts.filter((item)=>{
        return item>0
    }).reduce((acc,item)=>{
        return acc+=item
    },0).toFixed(2)

    const expense = amounts.filter((item) => {
        return item < 0
    }).reduce((acc, item) => {
        return acc += item
    }, 0).toFixed(2)
    console.log(income,expense)

    balance.innerText =`₹${total}`
    money_plus.innerText=`₹${income}`
    money_minus.innerText = `₹${expense}`

}


//remove transaction
function removeTransaction(id){
    transactions=transactions.filter((transaction)=>{
        return transaction.id!==id
    })

    updateLocalStorage()
    
    init()
}

//update localStorage transactions
function updateLocalStorage(){
    localStorage.setItem('transactions',JSON.stringify(transactions))
}


//int app
function init(){
    list.innerHTML='';

    transactions.forEach(addTransactionToDOM)
    updateValues()
}



init()



form.addEventListener('submit',addTransaction)