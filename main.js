const $btn = document.getElementById('btn-kick');
const $btn_bonus = document.getElementById('btn-kick-bonus');

const character = {
	name: 'Pikachu',
	defaultHP: 100,
	damageHP: 100,
	elHP: document.getElementById('health-character'),
	elProgressbar: document.getElementById('progressbar-character'),
}

const enemy = {
	name: 'Charmander',
	defaultHP: 100,
	damageHP: 100,
	elHP: document.getElementById('health-enemy'),
	elProgressbar: document.getElementById('progressbar-enemy'),
}

$btn.addEventListener('click', function(){
	console.log('kick');
	changeHP(random(20), character);
	changeHP(random(20), enemy);
})

$btn_bonus.addEventListener('click', function(){
	console.log('PIKA PIKA! PIKA CHUUUU!');
	changeHP(random(40), enemy);
	$btn_bonus.style.visibility = 'hidden';
})

function init(){
	console.log('Start Game!');
	renderHP(character);
	renderHP(enemy);
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
	if(person == character && person.damageHP < 25){
		alert('Открыт бонусный удар!!! Используй его чтобы победить! ✨');
		$btn_bonus.style.visibility = 'visible';
	}
	if(person.damageHP < count){
		person.damageHP = 0;
		alert(person.name+' проиграл бой!');
		$btn.disabled = true; 
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