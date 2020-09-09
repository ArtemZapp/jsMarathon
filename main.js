const $btn = document.getElementById('btn-kick');
const $btn_kick_bonus = document.getElementById('btn-kick-bonus');
const $kick_bonus = document.getElementById('kick-bonus');
const $textFight = document.getElementById('textFight');
const $character = document.getElementsByClassName('pokemon character')[0].childNodes;
const $enemy = document.getElementsByClassName('pokemon enemy')[0].childNodes;
const modal = document.getElementById("myModal");
const modalText = document.getElementById("modal-text");
const $btn_retry = document.getElementById('retryBtn');
const $btn_next = document.getElementById('nextBtn');

const character = {
	name: $character[7].getElementsByTagName("h2")[0].innerText,
	defaultHP: 100,
	damageHP: 100,
	elHP: document.getElementById('health-character'),
	elProgressbar: document.getElementById('progressbar-character'),
}

const enemy = {
	name: $enemy[5].getElementsByTagName("h2")[0].innerText,
	defaultHP: 100,
	damageHP: 100,
	elHP: document.getElementById('health-enemy'),
	elProgressbar: document.getElementById('progressbar-enemy'),
}

let isResizeble = false;
let i;
let fail_audio = new Audio();
let win_audio = new Audio();
win_audio.preload = 'auto';
win_audio.src = 'assets/wow.mp3';
fail_audio.preload = 'auto';
fail_audio.src = 'assets/wasted.mp3';

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
    modal.style.display = "none";
  }
}

const box = {
	name_bonus : function (){
		document.getElementById("canvas").style.visibility = "visible";
		if(!isResizeble){
			$kick_bonus.classList.remove('none');
			$kick_bonus.classList.add('control');
			isResizeble = true;
			showModal('Открыт бонусный удар!!! Используй его чтобы победить! ✨');
		}
	},
	name_win : function (){
		$textFight.innerHTML = 'ТЫ выиграл, WOW</br>' + character.name + ' win!';
		enemy.damageHP = 0;
		disableButton();
		showBoxWin();
	},
	name_lost : function (){
		$textFight.innerHTML = 'ШТОШ, ты проиграл</br>' + enemy.name + ' win!';
		character.damageHP = 0;
		disableButton();
		showBoxLose();
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

function init(){
	console.log('Start Game!');
	renderHP(character);
	renderHP(enemy);
}

init();