//________________________________Game JS ------______________________
const cells = document.querySelectorAll(".cell")

const playerOneResult = document.querySelector(".result_one")
const Result_Draw  = document.querySelector(".draw")
const playerTowResult = document.querySelector(".result_tow")


const Messg_Content = document.querySelector('.content')

const Overlay = document.getElementById("overly")

const Closed = document.getElementById("close")


cases_To_Win = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8]
];

const Current_Turn=document.querySelector(".current-turn")


let Turn = true;

let Winner = false;

let Draw = 0;

const BtnReset= document.querySelector(".reset");


let Used_Fields=[];




let playerOne={
    Symbol : '<i class= "fa fa-close"></i>',
    played : [],
    result : 0
}
let playerTow={
    Symbol : '<i class= "fa fa-circle-o"></i>',
    played : [],
    result : 0
}


for (let i=0 ; i < 9; i++){
    cells[i].addEventListener("click",function(){
        if (Place_Emty(i)==true){
            if (Turn == true){
                    addSymbol(playerOne,i);
                    Turn = false;
                    ChekWin(playerOne)
                    
                    Check_Turn();
            }else{
                    addSymbol(playerTow,i);
                    
                    Turn = true;
                    ChekWin(playerTow)
                    Check_Turn();
            }
        }else{
            alert("choose an empty cell")
        }
        
        
    })

};


function addSymbol(player ,i){
    cells[i].innerHTML=player.Symbol;
    player.played.push(i);
    Used_Fields.push(i)
}





function Place_Emty(i){
    if (Used_Fields.includes(i)){
        return false
    }else{
        return true
    }

}



function Reset(){
    cells.forEach(cell=> {
        cell.innerHTML="";
    })
    Winner = false;
    Used_Fields = [];
    playerOne.played = [];
    playerTow.played = [];
    Turn = true;
    Check_Turn();
}

BtnReset.addEventListener("click" , Reset)



function Check_Turn(){
    if (Turn==true){
        Current_Turn.innerHTML= playerOne.Symbol;
    }else{
        Current_Turn.innerHTML= playerTow.Symbol;
    }
}Check_Turn()



function Show_Result(){
    playerOneResult.innerHTML = playerOne.result;
    playerTowResult.innerHTML = playerTow.result;
    Result_Draw.innerHTML = Draw ;
}


Closed.addEventListener("click" , function(){
    Overlay.style.display = 'none';

})


function Show_Massg(player,Winner){

    Overlay.style.display = 'flex';
    if (Winner){
        Messg_Content.innerHTML = `<b> ${player.Symbol} Is The <h1>winner </h1> </b>`;
        
        
    }else{
        Messg_Content.innerHTML = `<b> It Is a <h1> Draw </h1> </b>`;
        
    }

    
    Reset()
}

function ChekWin(players){
    if (!Winner){
        // function
        cases_To_Win.some(Win=> {                        
        if (Win.every(index => players.played.includes(index))){
           Winner = true;
           players.result++;
           Show_Result();
        
            setTimeout(Show_Massg,500,players,Winner);
            Reset();
        }
    })
    }

    if (!Winner && Used_Fields.length == 9){
        Draw++;
        Show_Result();
        setTimeout(Show_Massg,500);
        Reset();

    }
    
    

}


//___________________________________FIN GAME JS__________________________________









