var token = 'BQBwhu1HIIetIP_mhvqPxLn--5H6lY35TlkRjKEMsmZt8eXulSF4XdCKJ2-_-KFK_PCAfHl_wIHk6dMHLFvBe_ZyRb58txtUiqLdQDqyBCKKmT6Tl6wg7ysAPXJZEowYQLIAKTZf2f-tM4Y'

$('#searchMusic button').on('click', function (e) {
  e.preventDefault()

  var querySearch = $('#searchMusic input').val()
  // console.log(querySearch)

  var urlSearch = 'https://api.spotify.com/v1/search?type=artist&query=' + querySearch
  // console.log(urlSearch)

  $.ajax({
    url: urlSearch,

    // Para usar APIs de contenido no público (ej. Spotify) tenemos que añadir el tag 'headers:' en nuestra petición AJAX
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
  .then(function (oSearch) {
  // console.log(oSearch.artists.items)

	  var sArtist = oSearch.artists.items.map(function (aArtist) {
	  		return '<option value="' + aArtist.id + '">' + aArtist.name + '</option>'
	  }).join('')
	  // console.log(sArtist)

	  $('#searchSelect').html(sArtist)
  })
})

$('#searchSelect').on('change', function (e) {
  e.preventDefault()

  var artistId = $(this).val()

  // console.log(artistId)
  var urlArtistAlbum = 'https://api.spotify.com/v1/artists/' + artistId + '/albums'

  $.ajax({
  	url: urlArtistAlbum,
  	headers: {
    Authorization: 'Bearer ' + token
  }
  })
  .then(function (oArtistAlbum) {
  	var albumArtistName = oArtistAlbum.items.map(function (albumName) {
    	return '<option value="' + albumName.id + '">' + albumName.name + '</option>'
  	}).join('')
  	// console.log(albumArtistName)

  	$('#albumSelect').html(albumArtistName)
  })
})

$('#albumSelect').on('change', function () {
  var albumId = $(this).val()
  var urlAlbum = 'https://api.spotify.com/v1/albums/' + albumId + '/tracks'

  $.ajax({
  	url: urlAlbum,
  	headers: {
	  Authorization: 'Bearer ' + token
  }
  })
  .then(function (oTracks) {
  	// console.log(oTracks)
  	var trackName = oTracks.items.map(function (tracks) {
  		// console.log(tracks)
  		return '<li><a href="' + tracks.preview_url + '">' + tracks.name + '</a></li>'
  	}).join('')

  	$('#trackSelect').html(trackName)
  })
})

// .preview_url
// $('#trackSelect').on('change', function () {

// })
