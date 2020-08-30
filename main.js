const $btn = document.getElementById('btn-kick');
const $btn_kick_bonus = document.getElementById('btn-kick-bonus');
const $kick_bonus = document.getElementById('kick-bonus');
const $textFight = document.getElementById('textFight');
const $character = document.getElementsByClassName('pokemon character')[0].childNodes;
const $enemy = document.getElementsByClassName('pokemon enemy')[0].childNodes;
let isResizeble = false;
let i;

let audio = new Audio();
audio.preload = 'auto';
audio.src = 'assets/wow.mp3';

function boxThis() {
	$textFight.parentElement.style.opacity = '1';
	$textFight.parentElement.style.padding = '20px';
	audio.play();
	setTimeout(function(){ $textFight.parentElement.style.display = 'none'; }, 3000);
}

console.log($character[5]);

const character = {
	name: $character[5],
	defaultHP: 100,
	damageHP: 100,
	elHP: document.getElementById('health-character'),
	elProgressbar: document.getElementById('progressbar-character'),
}

const enemy = {
	name: $enemy,
	defaultHP: 100,
	damageHP: 100,
	elHP: document.getElementById('health-enemy'),
	elProgressbar: document.getElementById('progressbar-enemy'),
}

const box = {
	name_bonus : function (){
		alert('Открыт бонусный удар!!! Используй его чтобы победить! ✨');
	},
	name_win : function (){
		$textFight.innerHTML = 'ТЫ выиграл, WOW</br>' + character.name + ' win!';
		boxThis();
	},
	name_lost : function (){
		$textFight.innerHTML = 'ШТОШ, ты проиграл</br>' + enemy.name + ' win!';
		boxThis();
	},
}

function fightWin(){
	enemy.damageHP = 0;
	box.name_win();
	$btn.disabled = true;
	$kick_bonus.classList.remove('control');
	$kick_bonus.classList.add('none');
}

function fightLost(){
	character.damageHP = 0;
	box.name_lost();
	$btn.disabled = true;
	$kick_bonus.classList.remove('control');
	$kick_bonus.classList.add('none');
}

$btn.addEventListener('click', function(){
	changeHP(random(15), character);
	changeHP(random(15), enemy);
})

$btn_kick_bonus.addEventListener('click', function(){
	changeHP(random(20), enemy);
	$kick_bonus.classList.remove('control');
	$kick_bonus.classList.add('none');
})

function init(){
	console.log('Start Game!');
	renderHP(character);
	renderHP(enemy);
}

function kickBonus(){
	if(!isResizeble){
		$kick_bonus.classList.remove('none');
		$kick_bonus.classList.add('control');
		box.name_bonus();
		isResizeble = true;
	}
}

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
	if(person === character && person.damageHP < 25){
		kickBonus();
	}
	if(person.damageHP < count && person === enemy){
		fightWin();
	}
	else if(person.damageHP < count && person === character){
		fightLost();
	}
	else{
		person.damageHP -= count;
	}
	renderHP(person);
}

function random(num){
	return Math.ceil(Math.random() * num);
}

init();