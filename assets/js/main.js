/*
	Dimension by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/
(function($) {

	var	$window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$header = $('#header'),
		$footer = $('#footer'),
		$main = $('#main'),
		$main_articles = $main.children('article');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});



	// Fix: Flexbox min-height bug on IE.
		if (browser.name == 'ie') {

			var flexboxFixTimeoutId;

			$window.on('resize.flexbox-fix', function() {

				clearTimeout(flexboxFixTimeoutId);

				flexboxFixTimeoutId = setTimeout(function() {

					if ($wrapper.prop('scrollHeight') > $window.height())
						$wrapper.css('height', 'auto');
					else
						$wrapper.css('height', '100vh');

				}, 250);

			}).triggerHandler('resize.flexbox-fix');

		}

	// Nav.
		var $nav = $header.children('nav'),
			$nav_li = $nav.find('li');

		// Add "middle" alignment classes if we're dealing with an even number of items.
			if ($nav_li.length % 2 == 0) {

				$nav.addClass('use-middle');
				$nav_li.eq( ($nav_li.length / 2) ).addClass('is-middle');

			}

	// Main.
		var	delay = 325,
			locked = false;

		// Methods.
			$main._show = function(id, initial) {

				var $article = $main_articles.filter('#' + id);

				// No such article? Bail.
					if ($article.length == 0)
						return;

				// Handle lock.

					// Already locked? Speed through "show" steps w/o delays.
						if (locked || (typeof initial != 'undefined' && initial === true)) {

							// Mark as switching.
								$body.addClass('is-switching');

							// Mark as visible.
								$body.addClass('is-article-visible');

							// Deactivate all articles (just in case one's already active).
								$main_articles.removeClass('active');

							// Hide header, footer.
								$header.hide();
								$footer.hide();

							// Show main, article.
								$main.show();
								$article.show();

							// Activate article.
								$article.addClass('active');

							// Unlock.
								locked = false;

							// Unmark as switching.
								setTimeout(function() {
									$body.removeClass('is-switching');
								}, (initial ? 1000 : 0));

							return;

						}

					// Lock.
						locked = true;

				// Article already visible? Just swap articles.
					if ($body.hasClass('is-article-visible')) {

						// Deactivate current article.
							var $currentArticle = $main_articles.filter('.active');

							$currentArticle.removeClass('active');

						// Show article.
							setTimeout(function() {

								// Hide current article.
									$currentArticle.hide();

								// Show article.
									$article.show();

								// Activate article.
									setTimeout(function() {

										$article.addClass('active');

										// Window stuff.
											$window
												.scrollTop(0)
												.triggerHandler('resize.flexbox-fix');

										// Unlock.
											setTimeout(function() {
												locked = false;
											}, delay);

									}, 25);

							}, delay);

					}

				// Otherwise, handle as normal.
					else {

						// Mark as visible.
							$body
								.addClass('is-article-visible');

						// Show article.
							setTimeout(function() {

								// Hide header, footer.
									$header.hide();
									$footer.hide();

								// Show main, article.
									$main.show();
									$article.show();

								// Activate article.
									setTimeout(function() {

										$article.addClass('active');

										// Window stuff.
											$window
												.scrollTop(0)
												.triggerHandler('resize.flexbox-fix');

										// Unlock.
											setTimeout(function() {
												locked = false;
											}, delay);

									}, 25);

							}, delay);

					}

			};

			$main._hide = function(addState) {

				var $article = $main_articles.filter('.active');

				// Article not visible? Bail.
					if (!$body.hasClass('is-article-visible'))
						return;

				// Add state?
					if (typeof addState != 'undefined'
					&&	addState === true)
						history.pushState(null, null, '#');

				// Handle lock.

					// Already locked? Speed through "hide" steps w/o delays.
						if (locked) {

							// Mark as switching.
								$body.addClass('is-switching');

							// Deactivate article.
								$article.removeClass('active');

							// Hide article, main.
								$article.hide();
								$main.hide();

							// Show footer, header.
								$footer.show();
								$header.show();

							// Unmark as visible.
								$body.removeClass('is-article-visible');

							// Unlock.
								locked = false;

							// Unmark as switching.
								$body.removeClass('is-switching');

							// Window stuff.
								$window
									.scrollTop(0)
									.triggerHandler('resize.flexbox-fix');

							return;

						}

					// Lock.
						locked = true;

				// Deactivate article.
					$article.removeClass('active');

				// Hide article.
					setTimeout(function() {

						// Hide article, main.
							$article.hide();
							$main.hide();

						// Show footer, header.
							$footer.show();
							$header.show();

						// Unmark as visible.
							setTimeout(function() {

								$body.removeClass('is-article-visible');

								// Window stuff.
									$window
										.scrollTop(0)
										.triggerHandler('resize.flexbox-fix');

								// Unlock.
									setTimeout(function() {
										locked = false;
									}, delay);

							}, 25);

					}, delay);


			};

		// Button Filtering Logic
		document.addEventListener("DOMContentLoaded", function () {
			const filterButtons = document.querySelectorAll(".filter-btn");
			const gridItems = document.querySelectorAll(".grid-item");
		
			filterButtons.forEach(button => {
				button.addEventListener("click", () => {
					const filter = button.getAttribute("data-filter");
		
					// Loop through each grid item
					gridItems.forEach(item => {
						// Show all items if filter is "all"
						if (filter === "all") {
							item.style.display = "block";
						} else {
							// Check if the item contains the class for the selected filter
							if (item.classList.contains(filter)) {
								item.style.display = "block";
							} else {
								item.style.display = "none";
							}
						}
					});
		
					// Update button styles (optional)
					filterButtons.forEach(btn => btn.classList.remove("active"));
					button.classList.add("active");
				});
			});
		});
		

		

		// Articles.
			$main_articles.each(function() {

				var $this = $(this);

				// Close.
					// $('<div class="close">Close</div>')
					// 	.appendTo($this)
					// 	.on('click', function() {
					// 		window.location.href = 'index.html';
					// 	});

					// Check if the current article is the one you want to modify.
					if ($this.hasClass('Games')) {
						// Add special behavior for the close button in this article.
						$('<div class="close">Special Close</div>')
							.appendTo($this)
							.on('click', function() {
								window.location.href = '#Works';
							});
					}else if ($this.hasClass('ExtraWorks')) {
						// Add special behavior for the close button in this article.
						$('<div class="close">Special Close</div>')
							.appendTo($this)
							.on('click', function() {
								window.location.href = '#ArtWorks';
							});
					} else {
						// Add default behavior for the close button in other articles.
						$('<div class="close">Close</div>')
							.appendTo($this)
							.on('click', function() {
								window.location.href = 'index.html';
							});
					}


				// Prevent clicks from inside article from bubbling.
					$this.on('click', function(event) {
						event.stopPropagation();
					});

			});

		// Events.
			$body.on('click', function(event) {

				// Article visible? Hide.
					if ($body.hasClass('is-article-visible'))
						$main._hide(true);

			});

			$window.on('keyup', function(event) {

				switch (event.keyCode) {

					case 27:

						// Article visible? Hide.
							if ($body.hasClass('is-article-visible'))
								$main._hide(true);

						break;

					default:
						break;

				}

			});

			$window.on('hashchange', function(event) {

				// Empty hash?
					if (location.hash == ''
					||	location.hash == '#') {

						// Prevent default.
							event.preventDefault();
							event.stopPropagation();

						// Hide.
							$main._hide();

					}

				// Otherwise, check for a matching article.
					else if ($main_articles.filter(location.hash).length > 0) {

						// Prevent default.
							event.preventDefault();
							event.stopPropagation();

						// Show article.
							$main._show(location.hash.substr(1));

					}

			});

		// Scroll restoration.
		// This prevents the page from scrolling back to the top on a hashchange.
			if ('scrollRestoration' in history)
				history.scrollRestoration = 'manual';
			else {

				var	oldScrollPos = 0,
					scrollPos = 0,
					$htmlbody = $('html,body');

				$window
					.on('scroll', function() {

						oldScrollPos = scrollPos;
						scrollPos = $htmlbody.scrollTop();

					})
					.on('hashchange', function() {
						$window.scrollTop(oldScrollPos);
					});

			}

		// Initialize.

			// Hide main, articles.
				$main.hide();
				$main_articles.hide();

			// Initial article.
				if (location.hash != ''
				&&	location.hash != '#')
					$window.on('load', function() {
						$main._show(location.hash.substr(1), true);
					});

		// Adding Back to Top functionality
		document.addEventListener("DOMContentLoaded", function () {
			const topButtons = document.querySelectorAll(".top-btn");
		
			topButtons.forEach(button => {
				button.addEventListener("click", function() {
					const targetSection = document.querySelector(button.getAttribute("data-target"));
					
					// Scroll smoothly to the top of the section
					targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
				});
			});
		});

		// Adding Horizontal Game Bar Auto populating
		document.addEventListener("DOMContentLoaded", function () {
			// Find all articles with the "Games" class
			const articles = document.querySelectorAll('article.Games');
		
			// Find all game items globally (outside the articles)
			const games = document.querySelectorAll('.game-item');
		
			// Loop through each article
			articles.forEach(article => {
				const carouselContainer = article.querySelector('.game-container'); // The carousel container inside this article
				const leftButton = article.querySelector('.carousel-nav.left'); // Left button for this article
				const rightButton = article.querySelector('.carousel-nav.right'); // Right button for this article
		
				// Ensure that the game-container exists for this article
				if (!carouselContainer) {
					console.error("Game container not found for article:", article.id);
					return; // Skip if no carousel container is found
				}
		
				// Get the current game title from the current article
				const currentGameTitle = article.getAttribute('id');
				console.log("Current article ID:", currentGameTitle);
		
				// Loop through all game items (outside articles) and populate the carousel, excluding the current game
				games.forEach(game => {
					const gameTitle = game.getAttribute('data-title'); // Get the game title
		
					// Skip the current game if the title matches the current article's title
					if (gameTitle === currentGameTitle) {
						console.log(`Skipping current game: ${gameTitle}`);
						return;
					}
		
					const gameImg = game.querySelector('img'); // Get the image inside the game item
					const gameImgSrc = gameImg.getAttribute('data-src'); // Get the 'data-src' attribute for lazyload images
		
					// Create a new div for the game in the carousel
					const newGameDiv = document.createElement('div');
					newGameDiv.classList.add('game-item'); // Add the class 'game-item' to the new div
					newGameDiv.innerHTML = `
						<img src="${gameImgSrc}" alt="${gameTitle}">
						`;
						// <h3>${gameTitle}</h3>
						
					// Reuse the existing onclick event from the game item
					newGameDiv.onclick = game.querySelector('.card').onclick;
		
					// Append the new game item to the carousel of this article
					carouselContainer.appendChild(newGameDiv);
					console.log(`Added game: ${gameTitle} to article: ${currentGameTitle}`);
				});
		
				// Scrolling logic for the left button of this specific article's carousel
				leftButton.addEventListener('click', function () {
					carouselContainer.scrollBy({
						left: -carouselContainer.offsetWidth / 2, // Scroll half the width of the container to the left
						behavior: 'smooth'
					});
				});
		
				// Scrolling logic for the right button of this specific article's carousel
				rightButton.addEventListener('click', function () {
					carouselContainer.scrollBy({
						left: carouselContainer.offsetWidth / 2, // Scroll half the width of the container to the right
						behavior: 'smooth'
					});
				});
			});
		});

		// Adding Screenshot logic
		// Store the screenshots and videos for each game
		document.addEventListener("DOMContentLoaded", function () {
			const games = {
				"I-Frankenstein": {
					name: "I-Frankenstein",
					folder: "images/I-Frankenstein/Screenshots/",
					screenshots: ["screenshot1.png", "screenshot2.png"],
					currentIndex: 0 // Start at the first screenshot
				},
				"HolySouls": {
					name: "Another Game",
					folder: "images/AnotherGame/Screenshots/",
					screenshots: ["screenshot1.png", "screenshot2.png", "screenshot3.png"],
					currentIndex: 0 // Start at the first screenshot
				}
				// Add more games as needed
			};
		
			// Function to initialize the media for a given article
			function initializeGameMedia(articleId) {
				const game = games[articleId]; // Get the game based on article ID
				const currentImage = document.querySelector(`#${articleId} #current-image`);
				const prevButton = document.querySelector(`#${articleId} .prev-button`);
				const nextButton = document.querySelector(`#${articleId} .next-button`);
				const indicatorsContainer = document.querySelector(`#${articleId} #indicators`);
		
				if (!game || !currentImage || !prevButton || !nextButton || !indicatorsContainer) {
					console.error(`Error initializing game media for ${articleId}`);
					return;
				}
		
				// Show the first screenshot initially
				updateImage(game, currentImage);
				updateIndicators(game, indicatorsContainer); // Initialize the indicators
		
				// Next button functionality
				nextButton.addEventListener('click', function () {
					if (game.currentIndex < game.screenshots.length - 1) {
						game.currentIndex++;
					} else {
						game.currentIndex = 0; // Loop back to the first image
					}
					updateImage(game, currentImage);
					updateIndicators(game, indicatorsContainer); // Update indicators when next is clicked
				});
		
				// Previous button functionality
				prevButton.addEventListener('click', function () {
					if (game.currentIndex > 0) {
						game.currentIndex--;
					} else {
						game.currentIndex = game.screenshots.length - 1; // Loop to the last image
					}
					updateImage(game, currentImage);
					updateIndicators(game, indicatorsContainer); // Update indicators when previous is clicked
				});
			}
		
			// Function to update the image
			function updateImage(game, imgElement) {
				const imageSrc = game.screenshots[game.currentIndex];
				imgElement.src = `${game.folder}${imageSrc}`;
				console.log(`Displaying image: ${imgElement.src}`);
			}
		
			// Function to update the indicators
			function updateIndicators(game, indicatorsContainer) {
				indicatorsContainer.innerHTML = ''; // Clear existing indicators
				for (let i = 0; i < game.screenshots.length; i++) {
					const indicator = document.createElement('div');
					indicator.classList.add('indicator');
					if (i === game.currentIndex) {
						indicator.classList.add('active'); // Highlight current screenshot
					}
					indicatorsContainer.appendChild(indicator);
				}
			}
		
			// Initialize media for all games (articles)
			document.querySelectorAll('article.Games').forEach(article => {
				const articleId = article.id; // Get the article ID
				initializeGameMedia(articleId); // Initialize the game media for this article
			});
		});
		
		
})(jQuery);