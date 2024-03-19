// Memory Game
// © 2014 Nate Wiley
// License -- MIT

// весь скрипт — это одна большая функция
(function(){
	var start;
	var k = 0;
	var time;

	var Memory = {
		init: function(cards){
			this.$sucsess = $(".sucsess");
			this.$game = $(".game");
			this.$topButton = $("button.top");
			this.$modal = $(".modal");
			this.$field = $(".text-field");
			this.$overlay = $(".modal-overlay");
			this.$arrow = $(".arrow");
			this.$restartButton = $("button.restart");
			this.$resultButton = $("button.result");
			this.$otpr = $("button.otpr");
			this.cardsArray = $.merge(cards, cards);
			this.shuffleCards(this.cardsArray);
			this.setup();
		},

		shuffleCards: function(cardsArray){
			this.$cards = $(this.shuffle(this.cardsArray));
		},

		setup: function(){
			this.html = this.buildHTML();
			this.$game.html(this.html);
			this.$memoryCards = $(".card");
			this.paused = false;
     		this.guess = null;
			this.binding();
		},

		binding: function(){
			this.$memoryCards.on("click", this.cardClicked);

			this.$restartButton.on("click", $.proxy(this.reset, this));

			this.$resultButton.on("click", $.proxy(this.writing, this));

			this.$arrow.on("click", $.proxy(this.letsgo, this));

			this.$otpr.on("click", $.proxy(this.writingValue, this));

		},

		cardClicked: function(){
			k=Number(k) + 1;
			
			if (k==1){
				start = Date.now();
			}

			var _ = Memory;
			var $card = $(this);
			
			if(!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")){
				$card.find(".inside").addClass("picked");
				
				if(!_.guess){
					
					_.guess = $(this).attr("data-id");
				
				} else if(_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")){
					
					$(".picked").addClass("matched");
					
					_.guess = null;
						
						} else {
							
							_.guess = null;
							
							_.paused = true;
						
							setTimeout(function(){
								$(".picked").removeClass("picked");
								Memory.paused = false;
							}, 600);
						}
			
				if($(".matched").length == $(".card").length){
					
					_.win();
				}
			}
		},
		writingValue: function(){
			var input = document.getElementsByName('string')[0].value;

			if (input != "@"){

				const data = {
					name: input,
					time: time
				}
			
				this.sendForm(data);
			}

		},


		sendForm: async function(data) {
			const res = await fetch('./feedback.php', {
				method: 'POST',
				headers: {'Content-type': 'application/json'},
				body: JSON.stringify(data)
			},
			);	
			if (res.status === 201) {
				this.$field.hide();
				this.$sucsess.show();
			}		
		},

		hidefirstbutton: function(){
			this.$resultButton.hide();
		},

		showarrowbutton: function(){
			this.$arrow.show();
		},

		hideModal: function(){
			this.$overlay.hide();
			this.$modal.hide();
		},


		writing: function(){
			
			this.hideModal();
			this.hidefirstbutton();
			this.showarrowbutton();
			
			Memory.showModalwriting();
			Memory.$game.fadeOut();
		},

		hideWriting: function(){
			this.$arrow.hide();
			this.$field.hide();
		},

		showModalwriting: function(){
		
			this.$overlay.show();
			this.$field.fadeIn("slow");
		},

		

		letsgo: function(){

		this.$sucsess.hide();
		this.hideWriting();
		this.$modal.fadeIn();
		
		this.$resultButton.show();

		document.getElementById("time").innerHTML = time;
		},

		
		win: function(){
			this.$sucsess.hide();
			k = 0;
			var delta = Math.floor((Date.now() - start)/1000);
			time = delta;
			document.getElementById("time").innerHTML = delta;
			
			this.paused = true;
			
			setTimeout(function(){
				Memory.showModal();
				Memory.$game.fadeOut();
			}, 1000);
			this.$resultButton.show();
		},

		
		showModal: function(){
			
			this.$overlay.show();
			
			this.$topButton.show();
			this.$modal.fadeIn("slow");
			
		},
		
		reset: function(){
			
			this.hideModal();
			
			this.shuffleCards(this.cardsArray);
			
			this.setup();
		
			this.$game.show("slow");
		},

		
		shuffle: function(array){
			var counter = array.length, temp, index;
		   	while (counter > 0) {
	        	index = Math.floor(Math.random() * counter);
	        	counter--;
	        	temp = array[counter];
	        	array[counter] = array[index];
	        	array[index] = temp;
		    	}
		    return array;
		},

		buildHTML: function(){
			
			var frag = '';
			
			this.$cards.each(function(k, v){
			
				{	
					var w = window.screen.width;
					if (w > 1200) {
						frag += '<div class="card" data-id="'+ v.id +'"><div class="inside">\
					<div class="front"><img src="'+ v.img +'"\
					alt="'+ v.name +'" /></div>\
					<div class="back"><img src="f.png"\
					alt="Codepen" /></div></div>\
					</div>';
					}

					else if (w <= 320) {
						frag += '<div class="card" data-id="'+ v.id +'"><div class="inside">\
					<div class="front"><img src="'+ v.img +'"\
					alt="'+ v.name +'" /></div>\
					<div class="back"><img src="f.png"\
					alt="Codepen" /></div></div>\
					</div>';
					}
					 
					else if (w <= 480) {
						frag += '<div class="card" data-id="'+ v.id +'"><div class="inside">\
					<div class="front"><img src="'+ v.img +'"\
					alt="'+ v.name +'" /></div>\
					<div class="back"><img src="f.png"\
					alt="Codepen" /></div></div>\
					</div>';
					}

					else if (w <= 768) {
						frag += '<div class="card" data-id="'+ v.id +'"><div class="inside">\
					<div class="front"><img src="'+ v.img +'"\
					alt="'+ v.name +'" /></div>\
					<div class="back"><img src="f.png"\
					alt="Codepen" /></div></div>\
					</div>';
					}

					else if (w < 992) {
						frag += '<div class="card" data-id="'+ v.id +'"><div class="inside">\
					<div class="front"><img src="'+ v.img +'"\
					alt="'+ v.name +'" /></div>\
					<div class="back"><img src="f.png"\
					alt="Codepen" /></div></div>\
					</div>';
					}

					else{
						frag += '<div class="card" data-id="'+ v.id +'"><div class="inside">\
					<div class="front"><img src="'+ v.img +'"\
					alt="'+ v.name +'" /></div>\
					<div class="back"><img src="f.png"\
					alt="Codepen" /></div></div>\
					</div>';
					}
				}
			});
			
			return frag;
		}
	};

	var cards = [
		{	
			
			name: "nike",
			img: "1.png",
			id: 1,
		},
		{
			name: "nike",
			img: "2.png",
			id: 2
		},
		{
			name: "nike",
			img: "3.png",
			id: 3
		},
		{
			name: "asics",
			img: "4.png",
			id: 4
		}, 
		{
			name: "asics",
			img: "5.png",
			id: 5
		},
		{
			name: "node",
			img: "6.png",
			id: 6
		},
		{
			name: "photoshop",
			img: "7.png",
			id: 7
		},
		{
			name: "python",
			img: "8.png",
			id: 8
		},
	];
    
	Memory.init(cards);


})();