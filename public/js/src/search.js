$(function () {
  $('#searchForm').on('submit', function(event) {
    event.preventDefault();

    // Grab input field HTML element with ID searchQuery
    var searchQuery = $('#searchQuery');

    $.ajax({
      url: '/search',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ restaurantQuery: searchQuery.val() }),

      success: function(response) {
        
        // Begin rendering data returned from server after form is submitted
        $( ".hero-browser-inner" ).empty().append( JSON.stringify(response).replace(/\"/g, "") );

        // Clear search input field
        searchQuery.val('');
      }
    })

  })
})