
//aqui faz a ligação dos textos com o index
const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector (".question-text");
const optionContainer = document.querySelector (".option-container");
const answersIndicatorConteiner = document.querySelector(".answers-indicator");
const closeBox = document.querySelector(".quiz-box");
const finalBox = document.querySelector(".final-box");
const finalBox2 = document.querySelector(".final-box2"); // apenas para resposta errada
const homeBox = document.querySelector(".home-box");
const btn = document.querySelector(".next-question-btn");


//const resultBox = document.querySelector(".result-box");

//declaração das variavies 
let questionCounter = 0; // para contar as questões
let currentQuestion; // aponta para a questão atual
let availableQuestions = []; // array de perguntas
let availableOptions = []; // array para listar as respostas


function setAvailableQuestions(){
	const totalquestion = quiz.length; //quiz é o array json do documento question.js
	for(let i=0; i < totalquestion; i++){
		availableQuestions.push(quiz[i]); 
		//availableQuestions = [i];
		//console.log(availableQuestions = [i]);
	}
}


function getNewQuestion(){
	
	if(questionCounter!=0){
	answersIndicatorConteiner.innerHTML = "Seu prémio atual é de " + premio + " mil!";
	}
	
	questionNumber.innerHTML = " Pergunta de número " + (questionCounter +1);
	
	const questionIndex = availableQuestions[questionCounter];
	currentQuestion = questionIndex;
	questionText.innerHTML = currentQuestion.question; // aqui mostra pergunta na tela apontando ao 'question' do documento 'question.js'
	console.log(questionIndex)
	
	const optionLen = currentQuestion.options.length;
	
for (let i=0 ; i<optionLen ; i ++){
		availableOptions.push(i)		
	}
	console.log(availableOptions);	
	
	optionContainer.innerHTML = '';   // limpa tela
	
		
	//cria opções de respostas no html
	for (let i=0 ; i<optionLen ; i ++){
		// sorteia as option
		const optonIndex = availableOptions[Math.floor(Math.random() *availableOptions.length)];
		//pega a posição das option
		const index2 = availableOptions.indexOf(optonIndex);
		//remove option para não repetir
		availableOptions.splice(index2,1);
		console.log(optonIndex)
		
		const option = document.createElement("div");
		option.innerHTML = currentQuestion.options[optonIndex];
		option.id = optonIndex; 
		option.className = "option";
		optionContainer.appendChild(option);
		option.setAttribute("onclick","getResult(this)");
		
	
	}
	questionCounter++;
	//console.log(questionCounter);
	
	
	//console.log(availableOptions);
	//console.log(currentQuestion.options)	
	//console.log(index1);
	//console.log(questionIndex);
	//console.log(availableQuestions);
}


// verifica se a resposta está correta
var nextbtn; // verifica se alguma alternativa foi selecionada

function getResult(element){
	const id = parseInt(element.id);
	
	
	if(id === currentQuestion.answer){
		console.log(" Certa resposta! :)");
		element.classList.add("correta");
		//console.log(element.id);
		// Atualisa o prémio
		if (questionCounter <6){
			premio ++;
		}
		if (questionCounter == 6){
		    premio = 10
		}
		if ((questionCounter > 6)&&(questionCounter <=10)) {
            premio +=10;
        }
		
		if (questionCounter == 11){
		    premio = 100
		}
		
		if ((questionCounter > 11)&&(questionCounter <=15)) {
            premio +=100;
        }
		if (questionCounter ==16){ // Pergunta de  1 milhão
			if (premio===500){ 
			premio *=2;
			
		    setTimeout(function() { finalBox.classList.remove("hide");}, 1000);
			//finalBox.classList.remove("hide");
			setTimeout(function() { closeBox.classList.add("hide");}, 1000);
			//setTimeout(function() { closeBox.classList.add("hide");}, 10000);
			setTimeout(function() { finalBox.querySelector(".total-premio").innerHTML =" 1 MILHÃO DE REAIS! ";}, 3250);
	        
			document.querySelector(".next-question-btn").remove();// remove os button para encerrar o jogo
			
			document.getElementById("author").innerHTML='Desenvolvido por @Edson Pinheiro';
			}
		}
		if (questionCounter ==16){
		answersIndicatorConteiner.innerHTML = " Certa resposta!";
		//answersIndicatorConteiner.innerHTML = " seu prémio atual é de " + premio + " mil!" ;
		}
		else {
			answersIndicatorConteiner.innerHTML = " Certa resposta!" + " Seu prémio atual é de " + premio + " mil!" ;

		}
		
	
			
	}
	else{ // ERRADA
		console.log(" Resposta errada. :("); 
		//console.log(element.id);
		element.classList.add("errada");
		premio = premio /2; // divide o prémio se errar
		answersIndicatorConteiner.innerHTML = " Você ERROU! Tente outra vez, você consegue. " ;
        if (questionCounter > 1){
			answersIndicatorConteiner.innerHTML = " Você ERROU! Seu prémio é de " + premio + " mil !" ;
		}
		
		if (questionCounter == 2){
			answersIndicatorConteiner.innerHTML = " Você ERROU! Recebe 500,00 Reais!" ;
		}
		
		
		if (questionCounter ==16){
			premio=0;
			answersIndicatorConteiner.innerHTML = " Você ERROU! Que pena, perdeu tudo! Tente mais uma vez! :)";
		}
	
		
	    
		const optionLen = optionContainer.children.length;
		for (let i=0;i<optionLen;i++){
			if (parseInt(optionContainer.children[i].id)=== currentQuestion.answer){
				//optionContainer.children[i].classList.add("correta"); // mostra qual é a resposta certa
				
				
			 document.querySelector(".next-question-btn").remove();// remove os botoes para encerrar o jogo
			 //closeBox.classList.add("hide"); // fecha a tela de perguntas.
			 finalBox2.classList.remove("hide"); // libera o botão de remomeçar
	        // finalBox.querySelector(".total-premio").innerHTML = premio + " mil";
             
			}
		}
		
		document.getElementById("author").innerHTML='Desenvolvido por @Edson Pinheiro';


	}
	nextbtn = element.id; 
	console.log(nextbtn)
			
	//const id = parseInt(element.id);
	//console.log(typeof id);
	//console.log(element.innerHTML);//mostra a resposta
    //console.log(element.id);	//mostra o número (13:30)
	
	unclickableOptions();
}


var premio = 0;
function stop(){
	console.log(questionCounter);
	if (questionCounter == 1 ){
		window.alert("Você pode parar somente após a esta primeira pergunta! ");		
		
	}
	else{
	
	answersIndicatorConteiner.innerHTML = " Seu prémio é de " + premio + " mil " ;
   	closeBox.classList.add("hide"); // fecha a tela de perguntas.
    
	finalBox.classList.remove("hide");
	finalBox.querySelector(".total-premio").innerHTML = premio + " mil";
	
	//document.getElementById("author").innerHTML='Desenvolvido por @Edson Pinheiro';
    }
	
}


function next(){
	//console.log(id)
	console.log(nextbtn)
	if ((questionCounter === quiz.length)||(nextbtn == null)){
		window.alert("Você precisa responder!");		
		//console.log("estourou o vetor");
	}
	else {
		getNewQuestion();
		
	}
nextbtn = null; //limpa a variavel para comparar novamente
}


//deixa as outras opções desclicaveis na questão  
function unclickableOptions(){ 
	const optionLen = optionContainer.children.length;
   	for (let i=0; i < optionLen ; i++){
		optionContainer.children[i].classList.add("already-answered");
    
	//console.log(optionContainer.children[i])
	}
}




window.onload = function(){
	setAvailableQuestions(); // busca as respostas
	
	getNewQuestion(); // carrega as respostas
}
