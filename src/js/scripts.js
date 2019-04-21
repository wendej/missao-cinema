function abrirTab(evt, abas) {

	var i, tabcontent, tablinks;

	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}

	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}

	document.getElementById(abas).style.display = "block";
	evt.currentTarget.className += " active";
}

function SomenteNumero(e) {
    var tecla = (window.event) ? event.keyCode:e.which;   
    if (tecla > 47 && tecla < 58){
     	return true;
 	}
    else{
    	if (tecla==8 || tecla==0) {
    		return true;
    	}
		else {
			return false;
		}
    }
}

document.getElementById("defaultOpen").click();

$('#maisPopulares').ready(function() {

	var settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://api.themoviedb.org/3/discover/movie?page=1&include_video=false&include_adult=false&sort_by=popularity.desc&language=pt-BR&api_key=2faa82aa1b470622519733a02344ef42",
		"method": "GET",
		"headers": {},
		"data": "{}"
	}

	$.ajax(settings).done(function (response) {
		var settings = {
			"async": true,
			"crossDomain": true,
			"url": "https://api.themoviedb.org/3/genre/movie/list?language=pt-BR&api_key=2faa82aa1b470622519733a02344ef42",
			"method": "GET",
			"headers": {},
			"data": "{}"
		}

		for (var i = 0; i < response.results.length; i++) {

			var poster = '';
			var cont = 0;
			var cor = '';

			$.ajax(settings).done(function (generos) {
				generos.genres.forEach(function (item, indice, array) {
					if (response.results[cont].genre_ids.indexOf(item.id) != -1) {
						$('#genero-popular-'+cont).append($('<span>', {
							text: item.name + ' '
						}));
					}
				});
				cont++;
			});
			if (response.results[i].poster_path == null) {
				poster = 'src/image/default.png';
			} else {
				poster = 'https://image.tmdb.org/t/p/w200' + response.results[i].poster_path;
			}	

			if (response.results[i].vote_average > 7) {
				cor = '#60e4b8';
			} else if (response.results[i].vote_average < 7 && response.results[i].vote_average > 5) {
				cor = '#e49160';
			} else {
				cor = '#e23f3f';
			}

			$('#resultadoMaisPopulares').append($('<div>', {
				id: 'card-popular-' + i,
				class: 'card'
			}));

			$('#card-popular-'+i).append($('<img>', {
				src: poster,
				class: 'card-img'
			}));

			$('#card-popular-'+i).append($('<div>', {
				id: 'card-container-popular-' + i,
				class: 'container-card'
			}));

			$('#card-container-popular-'+i).append($('<h2>', {
				id: 'header-popular-'+i,
				text: response.results[i].original_title
			}));

			$('#header-popular-'+i).append($('<span>', {
				style: 'float:right; background-color: '+cor+'; padding: 1%;',
				text: response.results[i].vote_average
			}));

			$('#card-container-popular-'+i).append($('<p>', {
				id: 'genero-popular-'+i,
				text: 'Gênero: '
			}));

			$('#card-container-popular-'+i).append($('<p>', {
				text: 'Data de Lançamento: ' + response.results[i].release_date
			}));

			$('#card-container-popular-'+i).append($('<p>', {
				text: 'Sinopse: ' + response.results[i].overview
			}));
		}
	});
});

$('#maisBemVotados').ready(function() {

	var settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://api.themoviedb.org/3/discover/movie?vote_count.gte=250&page=1&include_video=false&include_adult=false&sort_by=vote_average.desc&language=pt-BR&api_key=2faa82aa1b470622519733a02344ef42",
		"method": "GET",
		"headers": {},
		"data": "{}"
	}

	$.ajax(settings).done(function (response) {
		var settings = {
			"async": true,
			"crossDomain": true,
			"url": "https://api.themoviedb.org/3/genre/movie/list?language=pt-BR&api_key=2faa82aa1b470622519733a02344ef42",
			"method": "GET",
			"headers": {},
			"data": "{}"
		}

		for (var i = 0; i < response.results.length; i++) {

			var poster = '';
			var cont = 0;
			var cor = '';

			$.ajax(settings).done(function (generos) {
				generos.genres.forEach(function (item, indice, array) {
					if (response.results[cont].genre_ids.indexOf(item.id) != -1) {
						$('#genero-bem-votados-'+cont).append($('<span>', {
							text: item.name + ' '
						}));
					}
				});
				cont++;
			});
			if (response.results[i].poster_path == null) {
				poster = 'src/image/default.png';
			} else {
				poster = 'https://image.tmdb.org/t/p/w200' + response.results[i].poster_path;
			}	

			if (response.results[i].vote_average > 7) {
				cor = '#60e4b8';
			} else if (response.results[i].vote_average < 7 && response.results[i].vote_average > 5) {
				cor = '#e49160';
			} else {
				cor = '#e23f3f';
			}

			$('#resultadoMaisBemVotados').append($('<div>', {
				id: 'card-bem-votados-' + i,
				class: 'card'
			}));

			$('#card-bem-votados-'+i).append($('<img>', {
				src: poster,
				class: 'card-img'
			}));

			$('#card-bem-votados-'+i).append($('<div>', {
				id: 'card-container-bem-votados-' + i,
				class: 'container-card'
			}));

			$('#card-container-bem-votados-'+i).append($('<h2>', {
				id: 'header-bem-votados-'+i,
				text: response.results[i].original_title
			}));

			$('#header-bem-votados-'+i).append($('<span>', {
				style: 'float:right; background-color: '+cor+'; padding: 1%;',
				text: response.results[i].vote_average
			}));

			$('#card-container-bem-votados-'+i).append($('<p>', {
				id: 'genero-bem-votados-'+i,
				text: 'Gênero: '
			}));

			$('#card-container-bem-votados-'+i).append($('<p>', {
				text: 'Data de Lançamento: ' + response.results[i].release_date
			}));

			$('#card-container-bem-votados-'+i).append($('<p>', {
				text: 'Sinopse: ' + response.results[i].overview
			}));
		}
	});
});

$('#maisVotados').ready(function() {

	var settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://api.themoviedb.org/3/discover/movie?vote_count.gte=250&page=1&include_video=false&include_adult=false&sort_by=vote_count.desc&language=pt-BR&api_key=2faa82aa1b470622519733a02344ef42",
		"method": "GET",
		"headers": {},
		"data": "{}"
	}

	$.ajax(settings).done(function (response) {
		var settings = {
			"async": true,
			"crossDomain": true,
			"url": "https://api.themoviedb.org/3/genre/movie/list?language=pt-BR&api_key=2faa82aa1b470622519733a02344ef42",
			"method": "GET",
			"headers": {},
			"data": "{}"
		}

		for (var i = 0; i < response.results.length; i++) {

			var poster = '';
			var cont = 0;
			var cor = '';

			$.ajax(settings).done(function (generos) {
				generos.genres.forEach(function (item, indice, array) {
					if (response.results[cont].genre_ids.indexOf(item.id) != -1) {
						$('#genero-votados-'+cont).append($('<span>', {
							text: item.name + ' '
						}));
					}
				});
				cont++;
			});
			if (response.results[i].poster_path == null) {
				poster = 'src/image/default.png';
			} else {
				poster = 'https://image.tmdb.org/t/p/w200' + response.results[i].poster_path;
			}	

			if (response.results[i].vote_average > 7) {
				cor = '#60e4b8';
			} else if (response.results[i].vote_average < 7 && response.results[i].vote_average > 5) {
				cor = '#e49160';
			} else {
				cor = '#e23f3f';
			}

			$('#resultadoMaisVotados').append($('<div>', {
				id: 'card-votados-' + i,
				class: 'card'
			}));

			$('#card-votados-'+i).append($('<img>', {
				src: poster,
				class: 'card-img'
			}));

			$('#card-votados-'+i).append($('<div>', {
				id: 'card-container-votados-' + i,
				class: 'container-card'
			}));

			$('#card-container-votados-'+i).append($('<h2>', {
				id: 'header-votados-'+i,
				text: response.results[i].original_title
			}));

			$('#header-votados-'+i).append($('<span>', {
				style: 'float:right; background-color: '+cor+'; padding: 1%;',
				text: response.results[i].vote_average
			}));

			$('#card-container-votados-'+i).append($('<p>', {
				id: 'genero-votados-'+i,
				text: 'Gênero: '
			}));

			$('#card-container-votados-'+i).append($('<p>', {
				text: 'Data de Lançamento: ' + response.results[i].release_date
			}));

			$('#card-container-votados-'+i).append($('<p>', {
				text: 'Sinopse: ' + response.results[i].overview
			}));
		}
	});
});

$('#pesquisar').submit(function(event) {
	
	event.preventDefault();
	$('#resultado').html('');

	var settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&query=%20'"+$('#filme').val()+"'&language=pt-BR&api_key=2faa82aa1b470622519733a02344ef42",
		"method": "GET",
		"headers": {},
		"data": "{}"
	}

	$('#filme').val('');

	$.ajax(settings).done(function (response) {

		if (response.total_results == 0) {

			$('#resultado').html('');
			$('#resultado').append($('<h2>', {
				text: 'Nenhum filme encontrado :('
			}));
		}
		else {

			var settings = {
				"async": true,
				"crossDomain": true,
				"url": "https://api.themoviedb.org/3/genre/movie/list?language=pt-BR&api_key=2faa82aa1b470622519733a02344ef42",
				"method": "GET",
				"headers": {},
				"data": "{}"
			}

			for (var i = 0; i < response.results.length; i++) {

				var poster = '';
				var cont = 0;
				var cor = '';

				$.ajax(settings).done(function (generos) {
					generos.genres.forEach(function (item, indice, array) {
						if (response.results[cont].genre_ids.indexOf(item.id) != -1) {
							$('#genero-'+cont).append($('<span>', {
								text: item.name + ' '
							}));
						}
					});
					cont++;
				});
				if (response.results[i].poster_path == null) {
					poster = 'src/image/default.png';
				} else {
					poster = 'https://image.tmdb.org/t/p/w200' + response.results[i].poster_path;
				}	

				if (response.results[i].vote_average > 7) {
					cor = '#60e4b8';
				} else if (response.results[i].vote_average < 7 && response.results[i].vote_average > 5) {
					cor = '#e49160';
				} else {
					cor = '#e23f3f';
				}

				$('#resultado').append($('<div>', {
					id: 'card-' + i,
					class: 'card'
				}));

				$('#card-'+i).append($('<img>', {
					src: poster,
					class: 'card-img'
				}));

				$('#card-'+i).append($('<div>', {
					id: 'card-container' + i,
					class: 'container-card'
				}));

				$('#card-container'+i).append($('<h2>', {
					id: 'header'+i,
					text: response.results[i].original_title
				}));

				$('#header'+i).append($('<span>', {
					style: 'float:right; background-color: '+cor+'; padding: 1%;',
					text: response.results[i].vote_average
				}));

				$('#card-container'+i).append($('<p>', {
					id: 'genero-'+i,
					text: 'Gênero: '
				}));

				$('#card-container'+i).append($('<p>', {
					text: 'Data de Lançamento: ' + response.results[i].release_date
				}));

				$('#card-container'+i).append($('<p>', {
					text: 'Sinopse: ' + response.results[i].overview
				}));
			}
		}

	});	
});

$('#pesquisarMelhoresDoAno').submit(function(event) {
	
	event.preventDefault();
	$('#resultadoMelhoresDoAno').html('');

	var settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://api.themoviedb.org/3/discover/movie?api_key=2faa82aa1b470622519733a02344ef42&language=pt-BR&sort_by=vote_average.desc&include_adult=false&include_video=false&page=1&primary_release_year="+$('#ano').val()+"&vote_count.gte=250",
		"method": "GET",
		"headers": {},
		"data": "{}"
	}

	$('#ano').val('');

	$.ajax(settings).done(function (response) {

		if (response.total_results == 0) {

			$('#resultadoMelhoresDoAno').html('');
			$('#resultadoMelhoresDoAno').append($('<h2>', {
				text: 'Nenhum filme encontrado :('
			}));
		}
		else {

			var settings = {
				"async": true,
				"crossDomain": true,
				"url": "https://api.themoviedb.org/3/genre/movie/list?language=pt-BR&api_key=2faa82aa1b470622519733a02344ef42",
				"method": "GET",
				"headers": {},
				"data": "{}"
			}

			var contador = response.results.length > 15 ? 15 : response.results.length;

			for (var i = 0; i < contador; i++) {

				var poster = '';
				var cont = 0;
				var cor = '';

				$.ajax(settings).done(function (generos) {
					generos.genres.forEach(function (item, indice, array) {
						if (response.results[cont].genre_ids.indexOf(item.id) != -1) {
							$('#genero-ano'+cont).append($('<span>', {
								text: item.name + ' '
							}));
						}
					});
					cont++;
				});
				if (response.results[i].poster_path == null) {
					poster = 'src/image/default.png';
				} else {
					poster = 'https://image.tmdb.org/t/p/w200' + response.results[i].poster_path;
				}	

				if (response.results[i].vote_average > 7) {
					cor = '#60e4b8';
				} else if (response.results[i].vote_average < 7 && response.results[i].vote_average > 5) {
					cor = '#e49160';
				} else {
					cor = '#e23f3f';
				}

				$('#resultadoMelhoresDoAno').append($('<div>', {
					id: 'card-ano' + i,
					class: 'card'
				}));

				$('#card-ano'+i).append($('<img>', {
					src: poster,
					class: 'card-img'
				}));

				$('#card-ano'+i).append($('<div>', {
					id: 'card-container-ano' + i,
					class: 'container-card'
				}));

				$('#card-container-ano'+i).append($('<h2>', {
					id: 'header-ano'+i,
					text: response.results[i].original_title
				}));

				$('#header-ano'+i).append($('<span>', {
					style: 'float:right; background-color: '+cor+'; padding: 1%;',
					text: response.results[i].vote_average
				}));

				$('#card-container-ano'+i).append($('<p>', {
					id: 'genero-ano'+i,
					text: 'Gênero: '
				}));

				$('#card-container-ano'+i).append($('<p>', {
					text: 'Data de Lançamento: ' + response.results[i].release_date
				}));

				$('#card-container-ano'+i).append($('<p>', {
					text: 'Sinopse: ' + response.results[i].overview
				}));
			}
		}

	});	
});
