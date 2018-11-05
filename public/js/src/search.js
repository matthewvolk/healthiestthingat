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
        // Response from the backend is an array of objects
        // console.log(response);

        // Empty the content under the search bar
        $( ".hero-browser-inner" ).empty();

        if (response[0].menu_item_name) {
          // Loop through the array of objects
          for (let i = 0; i < 10; i++) {
            // Begin rendering data returned from server after form is submitted
            $( ".hero-browser-inner" ).append(`
              <p>
                <strong>Menu Item:</strong> ${response[i].menu_item_name} 
                <br /> 
                <strong>Calories:</strong> ${response[i].calories_kcal}
                <br />
                <strong>Total Fat:</strong> ${response[i].total_fat_grams}g
                <br />
                <strong>Total Carbs:</strong> ${response[i].carbohydrates_grams}g
                <br />
                <strong>Protein:</strong> ${response[i].protein_grams}g
                <br />
                <strong>Saturated Fat:</strong> ${response[i].saturated_fat_grams}g
                <br />
                <strong>Trans Fat:</strong> ${response[i].trans_fat_grams}g
                <br>
                <strong>Cholesterol:</strong> ${response[i].cholesterol_miligrams}mg
                <br />
                <strong>Sodium:</strong> ${response[i].sodium_miligrams}mg
                <br />
                <strong>Dietary Fiber:</strong> ${response[i].dietary_fiber_grams}g
                <br />
                <strong>Sugar:</strong> ${response[i].sugar_grams}g
              </p>`);
          }
        } else {
          $( ".hero-browser-inner" ).append(`Nutritional data coming soon!`);
        }
        
        // Clear search input field
        mainSearchInputField.val('');
      }
    })

  })
})