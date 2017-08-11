var WinArray = [];
var isLost = false;

window.onload = function () {
	createwindow();
}

function createwindow(){
		var exteriorDiv = document.createElement('div');
        exteriorDiv.className = 'modal';
		exteriorDiv.id = 'alert-modal';
        var InteriorDiv = document.createElement('div');
		InteriorDiv.className = 'modal-content';
		var name_entrance = document.createElement("INPUT");
    	name_entrance.id = 'name';
		name_entrance.className = 'field';
		name_entrance.setAttribute("type", "text");
    	name_entrance.setAttribute("placeholder", "Enter Your Name");
		var okButton = document.createElement('Button');
		okButton.onclick = function() {
			smile.setAttribute('data-value','ok');	
		}
        var t = document.createTextNode("OK");
        okButton.appendChild(t);
		InteriorDiv.appendChild(name_entrance);
		InteriorDiv.appendChild(okButton);
		exteriorDiv.appendChild(InteriorDiv);
		
		var window_Div = document.createElement('div');
		window_Div.className = 'window';
		var title_div = document.createElement('div');
		title_div.className = 'title-bar';
		window_Div.appendChild(title_div);
		var game_title = document.createElement('span');
		game_title.appendChild(document.createTextNode("Minesweeper Online - Beginner!"));
		title_div.appendChild(game_title);
		var btn_Div = document.createElement('div');
		var min_Button = document.createElement('span');
		min_Button.appendChild(document.createTextNode("-"));
		min_Button.className = 'btn';
		min_Button.id = 'btn-minimize';
        var close_Button = document.createElement('span');
        close_Button.appendChild(document.createTextNode("*"));
        close_Button.className = 'btn';
        close_Button.id = 'btn-close';
		btn_Div.appendChild(min_Button);		
		btn_Div.appendChild(close_Button);		
		title_div.appendChild(btn_Div);
		
		var top = document.createElement('div');
        top.className = 'top';
		window_Div.appendChild(top);
		
		var counter1 = document.createElement('span');
        counter1.className = 'counter';
        counter1.appendChild(document.createTextNode("123"));
		
		var smile = document.createElement('span');
        smile.className = 'smile';
		smile.onclick = function() {
			NewGame();	
		}
        smile.setAttribute('data-value','normal');
		smile.addEventListener("mouseover", func, false);
		smile.addEventListener("mouseout", func1, false);
		function func(){  
		  smile.setAttribute('data-value','hover');
		}
		function func1(){  
		  smile.setAttribute('data-value','normal');
		}

		
		var counter2 = document.createElement('span');
        counter2.className = 'counter';
        counter2.appendChild(document.createTextNode("321"));
		
		top.appendChild(counter1);
        top.appendChild(smile);
        top.appendChild(counter2);
		
		genrateArray()		
		var content = document.createElement('div');
        content.className = 'content-placeholder';
        initScreen(content);
        window_Div.appendChild(content);
        document.body.appendChild(window_Div);
        document.body.appendChild(exteriorDiv);		
		}


function genrateArray() {
	for (var i=0; i<10; i++){
		WinArray[i] = [];
		for(var j=0; j<10; j++){
			WinArray[i][j] = false;
			}
		}
	//find 10 random place for puttting mines(set true)
	for(var b=0; b<10; b++){
		var width = (Math.random()* 10 | 0);
      	var height = (Math.random()* 10 | 0);
		WinArray[width][height] = true;
     }
	return WinArray
}	
	
			
function initScreen(content) {
    for(let j=0; j<10; j++){
        var rowDiv = document.createElement('div');
        rowDiv.className = "row";
        rowDiv.id = j;
        for(let i=0; i<10; i++){
            let btn= document.createElement('Button');
                btn.classList.add("col");
            btn.id = i;
			//if(WinArray[i][j] === true)  //we can see where the bombs are
              //   btn.style.backgroundColor="darkred";
            btn.onclick=function () {
                btn.classList.add("col-clicked");
				clicked(i,j);
                let bombs = bombCounter(i,j);
           		
                if(!isLost ) {
                    if(bombs !== 0)
                        btn.innerHTML = bombs;
                  	else{
						btn.style.backgroundColor="grey";
						WinArray[i][j] = 2;
						revealNeighbors(i,j);
					}
                    if (bombs === 1)
                        btn.style.color = "blue";
                    if (bombs === 2)
                        btn.style.color = "green";
                    if (bombs === 3)
                        btn.style.color = "red";
                    if (bombs === 4)
                        btn.style.color = "darkblue";
                    if (bombs === 5)
                        btn.style.color = "darkred";
                    if (bombs === 6)
                        btn.style.color = "yellow";
                    if (bombs === 7)
                        btn.style.color = "orange";
                    if (bombs === 8)
                        btn.style.color = "pink";
                }
            }
            rowDiv.appendChild(btn);
        }
        content.appendChild(rowDiv);
    }
}
 
function NewGame(){
	document.body.removeChild(document.getElementsByClassName('window')[0]);
	createwindow();
}
	
function clicked(width, height) {
     if(WinArray[width][height] === true){
         isLost = true;
          for(let i=0; i<10; i++){
              for(let j=0;j<10; j++){
               	if(WinArray[i][j]=== true){
					document.getElementsByClassName("row")[j].getElementsByClassName("col")[i].style.backgroundColor = "red";
               	}       
             }
          }
        allert();	
    }

   bombCounter(width,height);
}

function bombCounter(width,height){
	 bombCount = 0;
    if((width-1>-1) && (height-1>-1) && WinArray[width-1][height-1] === true)
        bombCount++;
    if((width-1>-1) && WinArray[width-1][height] === true)
        bombCount++;
    if((width-1>-1) && (height+1<10) && WinArray[width-1][height+1] === true)
        bombCount++;
    if((height+1<10) && WinArray[width][height+1] === true)
        bombCount++;
    if((width+1<10) && (height+1<10) && WinArray[width+1][height+1] === true)
        bombCount++;
    if((width+1<10) && WinArray[width+1][height] === true)
        bombCount++;
    if((width+1<10) && (height-1>-1) && WinArray[width+1][height-1] === true)
        bombCount++;
    if((height-1>-1) && WinArray[width][height-1] === true)
        bombCount++;
    return bombCount;
	}

function revealNeighbors(i,j){ 	
		if ((i-1>-1) && (j-1>-1) && (WinArray[i-1][j-1] !== 2) && (bombCounter(i-1,j-1) === 0)){
		    WinArray[i-1][j-1] = 2;
            revealNeighbors(i-1, j-1);
            document.getElementsByClassName("row")[j-1].getElementsByClassName("col")[i-1].style.backgroundColor = "grey";
        }
		if ((i-1>-1) && (WinArray[i-1][j] !== 2) && (bombCounter(i-1,j) === 0)){
            WinArray[i-1][j] = 2;
            revealNeighbors(i-1, j);
            document.getElementsByClassName("row")[j].getElementsByClassName("col")[i-1].style.backgroundColor = "grey";
        }
		if ((i-1>-1) && (j+1<10) && (WinArray[i-1][j+1] !== 2) && (bombCounter(i-1,j+1)=== 0)){
            WinArray[i-1][j+1] = 2;
            revealNeighbors(i-1, j+1);
            document.getElementsByClassName("row")[j+1].getElementsByClassName("col")[i-1].style.backgroundColor = "grey";
        }        
		if ((j+1<10) && (WinArray[i][j+1] !== 2) && (bombCounter(i,j+1) === 0)){
        	WinArray[i][j+1] = 2;
            revealNeighbors(i,j+1);
            document.getElementsByClassName("row")[j+1].getElementsByClassName("col")[i].style.backgroundColor = "grey";
        }        
		if ((i-1>-1) && (j+1<10) && (WinArray[i-1][j+1] !== 2) && (bombCounter(i-1,j+1)=== 0)){
            WinArray[i-1][j+1] = 2;
            revealNeighbors(i-1, j+1);
            document.getElementsByClassName("row")[j+1].getElementsByClassName("col")[i-1].style.backgroundColor = "grey";
        } 
		if ((i+1<10) && (j+1<10) && (WinArray[i+1][j+1] !== 2) && (bombCounter(i+1,j+1)=== 0) ){
            WinArray[i+1][j+1] = 2;
            revealNeighbors(i+1, j+1);
            document.getElementsByClassName("row")[j+1].getElementsByClassName("col")[i+1].style.backgroundColor = "grey";
        }         
		if ((i+1<10) && (j-1>-1) && (WinArray[i+1][j-1] !== 2) && (bombCounter(i+1,j-1)=== 0)){
            WinArray[i+1][j-1] = 2;
            revealNeighbors(i+1,j-1);
            document.getElementsByClassName("row")[j-1].getElementsByClassName("col")[i+1].style.backgroundColor = "grey";
        }  
		if ((j-1>-1) && (WinArray[i][j-1] !== 2) && (bombCounter(i,j-1)=== 0)){
            WinArray[i][j-1] = 2;
            revealNeighbors(i, j-1);
            document.getElementsByClassName("row")[j-1].getElementsByClassName("col")[i].style.backgroundColor = "grey";
        }
		
		  
		
}

function allert() {
	var allert_Div = document.createElement('div');
	allert_Div.className = 'allert';
	allert_Div.appendChild(document.createTextNode("you lost"));
	//allert_Div.appendChild(allert_txt);
	var mybr = document.createElement('br');
	allert_Div.appendChild(mybr);
	var newgame_Button = document.createElement('Button');
    var t = document.createTextNode("New Game");
	newgame_Button.className = 'newgame_btn';
    newgame_Button.appendChild(t);
	allert_Div.appendChild(newgame_Button);
	newgame_Button.onclick=function () {
		NewGame();
		document.body.removeChild(document.getElementsByClassName('allert')[0]);
		}
	document.body.appendChild(allert_Div);
		
}