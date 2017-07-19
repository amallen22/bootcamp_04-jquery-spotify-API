var token = 'BQBwhu1HIIetIP_mhvqPxLn--5H6lY35TlkRjKEMsmZt8eXulSF4XdCKJ2-_-KFK_PCAfHl_wIHk6dMHLFvBe_ZyRb58txtUiqLdQDqyBCKKmT6Tl6wg7ysAPXJZEowYQLIAKTZf2f-tM4Y'

// EVENT 1
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

	  var sArtist = oSearch.artists.items.map(function (oArtist) {
	  		return '<option value="' + oArtist.id + '">' + oArtist.name + '</option>'
	  }).join('')
	  // console.log(sArtist)

	  $('#searchSelect').html(sArtist)
  })
})

// EVENT 2
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
  	// function uniq(array, param) {
   //   return a.filter(function (item, pos, array) {
   //     return array.map(function (mapItem) {
   //       return mapItem[param];
   //     }).indexOf(item[param]) === pos;
   //   })
   // }

    var firstOption = '<select disabled selected></select>'
  	var albumArtistName = oArtistAlbum.items.map(function (oAlbum) {
    	return '<option value="' + oAlbum.id + '">' + oAlbum.name + '</option>'
  	})
  	// console.log(albumArtistName)
    firstOption += albumArtistName.join('')

  	$('#albumSelect').html(albumArtistName)
  })
})

// EVENT 3
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
  		return '<li><a href="' + tracks.preview_url + '" target="_blank">' + tracks.name + '</a></li>'
  	}).join('')

  	$('#trackSelect').html(trackName)
  })
})

// .preview_url
// $('#trackSelect').on('change', function () {

// })
