const $btn = document.getElementById('btn-kick');
const $btn_kick_bonus = document.getElementById('btn-kick-bonus');
const $kick_bonus = document.getElementById('kick-bonus');
const $textFight = document.getElementById('textFight');
const $character = document.getElementsByClassName('pokemon character')[0].childNodes;
const $enemy = document.getElementsByClassName('pokemon enemy')[0].childNodes;
const modal = document.getElementById('myModal');
const modalText = document.getElementById("modal-text");
const $btn_retry = document.getElementById('retryBtn');
const $btn_next = document.getElementById('nextBtn');
const $heartLine = document.getElementsByClassName('heartLine')[0];
const $heart = document.createElement('img');
$heart.src = 'assets/heart.png';
$heart.className = 'heart';

const character = {
	name: $character[7].getElementsByTagName("h2")[0],
	defaultHP: 100,
	damageHP: 100,
	elHP: document.getElementById('health-character'),
	elProgressbar: document.getElementById('progressbar-character'),
}

const enemy = {
	name: $enemy[5].getElementsByTagName("h2")[0],
	picture:  $enemy[3],
	defaultHP: 100,
	damageHP: 100,
	elHP: document.getElementById('health-enemy'),
	elProgressbar: document.getElementById('progressbar-enemy'),
}

let enemiesNames = ['abra', 'bellsprout', 'bulbasaur', 'caterpie', 'dratini', 'eevee', 'jigglypuff', 'mankey', 'meowth', 'mew', 'pidgey', 'psyduck', 'rattata', 'snorlax', 'squirtle', 'venonat', 'weedle', 'zubat']
let nextEnemy;

let isResizeble = false;
let i;
let heartCount;
let fail_audio = new Audio();
let win_audio = new Audio();
win_audio.preload = 'auto';
win_audio.src = 'assets/wow.mp3';
fail_audio.preload = 'auto';
fail_audio.src = 'assets/death.mp3';

function showBoxWin() {
	$textFight.parentElement.style.opacity = '1';
	$textFight.parentElement.style.padding = '20px';
	win_audio.play();
	setTimeout(function(){ $textFight.parentElement.style.display = 'none'; }, 3000);
}

function showBoxLose() {
	$textFight.parentElement.style.opacity = '1';
	$textFight.parentElement.style.padding = '20px';
	fail_audio.play();
	setTimeout(function(){ $textFight.parentElement.style.display = 'none'; }, 3000);
}

//Show the modal 
function showModal(text) {
  modalText.innerText = text;
  modal.style.display = "block";
  setTimeout(function(){ modal.style.display = 'none'; }, 5000);
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
}

const box = {
	name_bonus : function (){
		document.getElementById("canvas").style.visibility = "visible";
		if(!isResizeble){
			$kick_bonus.classList.remove('none');
			$kick_bonus.classList.add('control');
			isResizeble = true;
			showModal('Bonus Kick was open!!! Use it for victory! ✨');
		}
	},
	name_win : function (){
		$textFight.innerHTML = 'YOU WIN, WOW</br>' + character.name.innerText + ' win!';
		enemy.damageHP = 0;
		disableButton();
		showBoxWin();
		nextFight();
	},
	name_lost : function (){
		$textFight.innerHTML = 'You were defeated</br>' + enemy.name.innerText + ' win!';
		character.damageHP = 0;
		disableButton();
		showBoxLose();
		if(heartCount>=0) removeHeart();
		else tryAgain();
		replay();
	},
}

function disableButton(){
	$btn.disabled = true;
	$kick_bonus.classList.remove('control');
	$kick_bonus.classList.add('none');
}

$btn.addEventListener('click', function(){
	changeHP(random(15), character);
	if(character.damageHP != '0'){
		changeHP(random(15), enemy);
	}
})

$btn_kick_bonus.addEventListener('click', function(){
	changeHP(random(20), enemy);
	$kick_bonus.classList.remove('control');
	$kick_bonus.classList.add('none');
})

function renderHP(person){
	renderHPLife(person);
	renderProgressBar(person);
}

function renderHPLife(person){
	person.elHP.innerText = person.damageHP + '/' + person.defaultHP;
}

function renderProgressBar(person){
	person.elProgressbar.style.width = person.damageHP + '%';
}

function changeHP (count, person){
	if(person.damageHP < count && person === enemy){
		box.name_win();
	}
	else if(person.damageHP < count && person === character){
		box.name_lost();
	}
	else{
		person.damageHP -= count;
	}
	renderHP(person);
	if(person === character && person.damageHP < 25){
		box.name_bonus();
	}
}

function random(num){
	return Math.ceil(Math.random() * num);
}

function nextFight(){
	replay();
	nextEnemy = enemiesNames[random(18)];
	enemy.picture.src = 'assets/person/'+nextEnemy+'_icon.png';
	enemy.name.innerText = nextEnemy.charAt(0).toUpperCase() + nextEnemy.slice(1);
}

function replay(){
	character.damageHP = 100;
	enemy.damageHP = 100;
	renderHPLife(character);
	renderHPLife(enemy);
	renderProgressBar(character);
	renderProgressBar(enemy);
	isResizeble = false;
	$btn.disabled = false;
}

function removeHeart(){
	$heartLine.removeChild($heartLine.firstChild);
	heartCount--;
}

function tryAgain(){
	setHeartLine();
	//TODO
}

function setHeartLine(){
	heartCount = 4;
	for(i = 0; i<=4; i++){
		$heartLine.appendChild($heart.cloneNode());
	}
}

function init(){
	console.log('Start Game!');
	renderHP(character);
	renderHP(enemy);
	tryAgain();
}

init();