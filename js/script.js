$(document).ready(function() {
	let count = 0,
		flag = false,
		availableGames = 0,
		modal = $('.modal'),
		modalText = $('.game-text span'),
		btnmodal = $('.btn-modal')
		torch = $('.torch'),
		content = $('.content'),
		sideBar = $('.sidebar'),
		chest = $('.chest'),
		face = $('.face'),
		btnArrowPlus = $('.btn-arrow-up'),
		btnArrowMinus = $('.btn-arrow-down'),
		gameCount = $('.purchase-count span'),
		summCount = $('.summ-count .count'),
		btnBuy = $('.btn-buy'),
		availableCount = $('.available-count span'),
		btnPlay = $('.btn-play'),
		sidebarInfo = $('.sidebar-info'),
		chestContainer = $('.chests')
		loader = $('.loader'),
		dwarfElements = $('.dwarf-animating > div'),
		imageCount = 0,
		faceCount = 0;


	//START
	setTimeout(function() {
		loader.addClass('hide');
		content.addClass('show');
		sideBar.addClass('show');
	}, 500);
	setTimeout(function() {
		torch.addClass('show');
	}, 1000);


	//ANIMATION
	setInterval(function() {
	  dwarfElements.removeClass('animate').filter(dwarfElements[imageCount]).toggleClass('animate');
	  imageCount < dwarfElements.length - 1 ? imageCount++ : imageCount = 0;
	}, 5000);


	//FUN
	face.on('click', function() {
		dwarfElements.removeClass('animate');
		$(this).addClass('animate');

		faceCount++;
		if(faceCount === 4) {
			$('.tooltip').html('<span class="text">Я тебе сейчас руки сломаю! Харе тыкать. </span>');
			faceCount = 0;
		}
	});
	chest.on('click', function() {
		$('.tooltip').html('<span class="text">Сначала купи игру, а потом уже лезь в мою сокровищницу</span>');
	});

	//MODAL
	btnmodal.on('click', function() {
		modal.removeClass('show win lose');
		chest.removeClass('win');
		chest.removeClass('lose');
		chest.removeClass('animate');
		if (availableGames > 0) {
			btnPlay.addClass('active').attr('disabled', false);
		} else if(availableGames === 0) {
			btnPlay.removeClass('active').attr('disabled', true);
			sidebarInfo.removeClass('in-game');
			$('.tooltip').html('<span class="text">Покупай игры и ищи несметные богатства.</span>');
		}
	});



	//BUTTON PLUS
	btnArrowPlus.on('click', function() {
		count++;
		if(count > 0) {
			btnBuy.addClass('active').attr('disabled', false);
		}

		updateCount();
	});

	//BUTTON MINUS
	btnArrowMinus.on('click', function() {
		if(count > 0) {
			count--;
		}
		
		updateCount();
		if(count === 0) {
			btnBuy.removeClass('active').attr('disabled', true);
			return false
		}
	});

	//BUTTON BUY
	btnBuy.on('click', function() {
		if(count > 0) {
			$('.tooltip').html('<span class="text">Жми "ИГРАТЬ" и вскрывай сундуки из моей сокровищницы!</span>');
			availableGames = count
			availableCount.text(availableGames);
			count = 0;
			sidebarInfo.addClass('in-game');
			$(this).removeClass('active').attr('disabled', true);
			btnPlay.addClass('active').attr('disabled', false);
		}
		updateCount();
	});


	//BUTTON PLAY
	btnPlay.on('click', function() {
		$(this).removeClass('active').attr('disabled', true);
		if (availableGames > 0) {
			availableGames--;
			game();
		} 
		updateCount();
	});


	//GAME CHEST
	function game() {
		let randomIndex;
			
		$.each(chest, function(i, el) {
		    setTimeout(function() {
		      $(el).addClass('animate');

		      if(i === 8 && $(el).hasClass('animate')) {
		    	randomIndex = Math.floor(Math.random() * chest.length);

		    	if(flag === false) {
					chest.eq(randomIndex).addClass('lose');
					setTimeout(function() {
						modal.addClass('show lose');
					}, 800);
					flag = true;
		    	} else {
					chest.eq(randomIndex).addClass('win');
					setTimeout(function() {
						modal.addClass('show win');
					}, 800);
					flag = false;
		    	}
		  	  }

		    }, 200 + (i * 200));

	  	});
	}

	//UPDATE NUMBERS
	function updateCount() {
		summCount.html(count * 5);
		gameCount.text(count);
		availableCount.text(availableGames);
		modalText.text(availableGames);
	}

});