$(function () {
  $('#searchForm').on('submit', function(event) {
    event.preventDefault();

    var searchQuery = $('#searchQuery');

    $.ajax({
      url: '/search',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ restaurantQuery: searchQuery.val() }),
      success: function(response) {
        $( ".hero-browser-inner" ).empty().append( JSON.stringify(response) );
        searchQuery.val('');
      }
    })
  })
})