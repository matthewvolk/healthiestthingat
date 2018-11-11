/** 
 * $(function() {}) is jQuery short hand for: 
 * $(document).ready(function() { ... });  
*/
$(function () {
  // Grab input field HTML element with id="#searchQuery"
  var mainSearchInputField = $('#mainSearchInputField');

  // Focus on input onload
  mainSearchInputField.focus();

  $('#searchForm').on('submit', function(event) {
    event.preventDefault();

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
          for (let i = 0; i < 10; i++) {
            // Begin rendering data returned from server after form is submitted
            $( ".first" ).append(`
              <p>
                <span style="font-size:1.25rem; margin-bottom:10px;"><strong>${'#' + (i + 1)}. ${i == 0 ? '(Lowest Calories)' : ''} ${response[i].menu_item_name}</strong></span>
                <br /> 
                <br />
                <span style="color:#1eae8f;"><strong>Calories:</strong> ${response[i].calories_kcal}</span>
                <br />
                <strong>Total Fat:</strong> ${response[i].total_fat_grams}g
                <br />
                <span style="color:#1eae8f;"><strong>Total Carbs:</strong> ${response[i].carbohydrates_grams}g</span>
                <br />
                <span style="color:#1eae8f;"><strong>Protein:</strong> ${response[i].protein_grams}g</span>
                <br />
                <strong>Saturated Fat:</strong> ${response[i].saturated_fat_grams}g
                <br />
                <strong>Trans Fat:</strong> ${response[i].trans_fat_grams}g
                <br>
                <strong>Cholesterol:</strong> ${response[i].cholesterol_miligrams}mg (${(((response[i].cholesterol_miligrams) / 300).toFixed(4) * 100).toFixed(2)}% DV*)
                <br />
                <span style="color:#1eae8f;"><strong>Sodium:</strong> ${response[i].sodium_miligrams}mg (${(((response[i].sodium_miligrams) / 2300).toFixed(4) * 100).toFixed(2)}% DV*)</span> 
                <br />
                <strong>Dietary Fiber:</strong> ${response[i].dietary_fiber_grams}g
                <br />
                <strong>Sugar:</strong> ${response[i].sugar_grams}g
              </p>
              <hr />`);
          }
          $( ".first" ).append(`<small>*Daily Values based on a 2,000 calorie diet.</small>`);

        } else {
          $( ".first" ).append(`<p>Oops! We're still building our database, and don't have that restaurant yet. To request that we add it, send an email to Matt at <a href="mailto:volkmattj@gmail.com"><span style="unicode-bidi: bidi-override; direction: rtl;">moc.liamg@jttamklov</span></a></p><img style="margin: 0 auto;" src='https://media0.giphy.com/media/CDpAmfo9dbOyA/giphy.gif?cid=3640f6095be4f32d737452426baf3e84' />`);
        }
        
        // Clear search input field
        mainSearchInputField.val('');
        mainSearchInputField.blur();
      }
    })

  })
})