$(document).ready(function(){
$('#currentDay').html(moment().format('dddd[,] MMMM wo'));


// Let build my functions library/object to better manage the functions
// inside the first function we will control how the input box behave base on time
// set an interval that checks the current time (moment()) constantly
 const library={
     checkTime: function(){
        let nine= $('.9AM');
         nine.val(moment().hour(09));
         let ten= $('.10AM');
         ten.val(moment().hour(10));
         let elev= $('.11AM');
         elev.val(moment().hour(00));
         let twelv= $('.12PM');
         twelv.val(moment().hour(12));
         let one= $('.1PM');
         one.val(moment().hour(13));
         let two= $('.2PM');
         two.val(moment().hour(14));
         let three= $('.3PM');
         three.val(moment().hour(15));
         let four= $('.4PM');
         four.val(moment().hour(16));
         let five= $('.5PM');
         five.val(moment().hour(17));
         let m= moment();
         
         let timeArr= [nine,ten,elev,twelv,one,two,three,four,five];
        

         for (let i=0; i< timeArr.length; i++){
             if (timeArr[i].val().isAfter(m,'minute')){
                 timeArr[i].next().removeClass('past present').addClass('future');
             } else if(timeArr[i].val().isSame(m,'minute')){
                timeArr[i].next().removeClass('past future').addClass('present');
             } else {
                timeArr[i].next().removeClass('future present').addClass('past');   
             }
         }
     },
     runCheckTime: function(){
        setInterval(function(){ library.checkTime();
            console.log('i am not counting');
         },60000);
     }
     
 }

library.checkTime();
library.runCheckTime();

//local storage section
// set up a click event that sets input into the local storage and recall on docement reloads


let nine= $('.9AM');
let ten= $('.10AM');
let elev= $('.11AM');
let twelv= $('.12PM');
let one= $('.1PM');
let two= $('.2PM');
let three= $('.3PM');
let four= $('.4PM');
let five= $('.5PM');
let m= moment();
         
let empty=[];

// this function runs for all buttons, when one button is clicke we are saving each 
//... list to a key(9 total).
//.. when page is refresh we will call back all the saved inpunt
const todo= function(event){
    let timeArrS= [nine,ten,elev,twelv,one,two,three,four,five];
for (let i=0; i<timeArrS.length;i++){
    let first=timeArrS[i].next().val()
    empty.splice([i],1,first);
    localStorage.setItem('mylist'+[i],empty[i]);
    };   
};

function getInput(){
    let timeArrS= [nine,ten,elev,twelv,one,two,three,four,five];
    for (let i=0; i<timeArrS.length;i++){  
    timeArrS[i].next().val(localStorage.getItem('mylist'+[i]));
    
    };
};

$('button').on('click',function(){
    event.preventDefault();
    todo();
}); 
// ADDING REAL TIME UPDATE WHEN USER DELETES OR PRESSES ENTER
$(document).on('keydown',function(event){
    // console.log(event.which);
    if (event.which== 13 ||event.which== 8 || event.which== 46){
        todo();
    }
});
getInput();
})