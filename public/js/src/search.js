/** 
 * $(function() {}) is jQuery short hand for: 
 * $(document).ready(function() { ... });  
*/
$(function () {
  $('#searchForm').on('submit', function(event) {
    event.preventDefault();

    // Grab input field HTML element with id="#searchQuery"
    var mainSearchInputField = $('#mainSearchInputField');

    $.ajax({
      url: '/search',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ restaurantQuery: mainSearchInputField.val() }),

      success: function(response) {
        
        // Begin rendering data returned from server after form is submitted
        $( ".hero-browser-inner" ).empty().append( JSON.stringify(response).replace(/\"/g, "") );

        // Clear search input field
        mainSearchInputField.val('');
      }
    })

  })
})