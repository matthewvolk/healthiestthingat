/** 
 * $(function() {}) is jQuery short hand for: 
 * $(document).ready(function() { ... });  
*/
$(function () {
  // Grab input field HTML element with id="#searchQuery"
  const mainSearchInputField = $('#mainSearchInputField');

  // Focus on input onload
  mainSearchInputField.focus();

  /**
   * TODO:
   * 
   * Fix minor issues with client-side XSS.
   * Postgres takes care of input sanitization on the backend
   * but there is nothing to prevent it on the front end. 
   * 
   * See function 'renderResults' below
   */

  $('#searchForm').on('submit', function(event) {
    event.preventDefault();

    $.ajax({
      url: '/search',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ restaurantQuery: mainSearchInputField.val() }),

      success: function(response) {
        // Response from the backend is an array of objects
        renderResults(response, mainSearchInputField.val())

        // Clear search input field
        mainSearchInputField.val('');
        mainSearchInputField.blur();

        window.scrollTo(0, 200);
      }
    })
  })

  $('.restaurant-link').on('click', function(event) {
    event.preventDefault();

    const restaurantName = $(this)[0].childNodes[1].dataset.restaurantImage;

    $.ajax({
      url: '/search',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ restaurantQuery: restaurantName }),

      success: function(response) {
        // Response from the backend is an array of objects
        renderResults(response, restaurantName);

        window.scrollTo(0, 200);
      }
    })
  })
})


const renderResults = (response, query) => {
  // Empty the content under the search bar
  $( ".hero-browser-inner" ).empty();

  if (response[0].menu_item_name) {

    if (query) {
      $('.first').append(`<p style="margin-top:0; margin-bottom:40px;">Results for '${query}'</p>`);
    }

    for (let i = 0; i < 25; i++) {
      // Begin rendering data returned from server after form is submitted
      $( ".first" ).append(`
        <p>
          ${renderImage(response, i)}
          <span style="margin-bottom:5px;font-size:1.15rem;"><strong>${'#' + (i + 1)}. ${i == 0 ? '(Lowest Calories)' : ''} ${response[i].menu_item_name}</strong></span>
          <br /> 
          <span style="color:#1eae8f;font-size:0.90rem;"><strong>Calories:</strong> ${response[i].calories_kcal}</span>
          <br />
          <span style="font-size:0.90rem;"><strong>Total Fat:</strong> ${response[i].total_fat_grams}g</span>
          <br />
          <span style="color:#1eae8f;font-size:0.90rem;"><strong>Total Carbs:</strong> ${response[i].carbohydrates_grams}g</span>
          <br />
          <span style="color:#1eae8f;font-size:0.90rem;"><strong>Protein:</strong> ${response[i].protein_grams}g</span>
          <br />
          <span style="font-size:0.90rem;"><strong>Saturated Fat:</strong> ${response[i].saturated_fat_grams}g</span>
          <br />
          <span style="font-size:0.90rem;"><strong>Trans Fat:</strong> ${response[i].trans_fat_grams}g</span>
          <br>
          <span style="font-size:0.90rem;"><strong>Cholesterol:</strong> ${response[i].cholesterol_miligrams}mg (${(((response[i].cholesterol_miligrams) / 300).toFixed(4) * 100).toFixed(2)}% DV*)</span>
          <br />
          <span style="color:#1eae8f;font-size:0.90rem;"><strong>Sodium:</strong> ${response[i].sodium_miligrams}mg (${(((response[i].sodium_miligrams) / 2300).toFixed(4) * 100).toFixed(2)}% DV*)</span> 
          <br />
          <span style="font-size:0.90rem;"><strong>Dietary Fiber:</strong> ${response[i].dietary_fiber_grams}g</span>
          <br />
          <span style="font-size:0.90rem;"><strong>Sugar:</strong> ${response[i].sugar_grams}g</span>
        </p>
        <hr />`);
    }
    $( ".first" ).append(`<small>*Daily Values based on a 2,000 calorie diet.</small>`);

  } else {
    // $( ".first" ).append(`<p>Oops! We're still building our database, and don't have '${query}' yet. To request that we add ${query} to our database, send an email to Matt at <a href="mailto:volkmattj@gmail.com?subject=Please add "${query}" to HealthiestThingAt!&body=That's all :)"><span style="unicode-bidi: bidi-override; direction: rtl;">moc.liamg@jttamklov</span></a></p><img style="margin: 0 auto;" src='https://media0.giphy.com/media/CDpAmfo9dbOyA/giphy.gif?cid=3640f6095be4f32d737452426baf3e84' />`);
    $( ".first" ).append(`<p>Oops! We're still building our database, and don't have that restaurant yet. To request that we add it to our database, send an email to Matt at <a href="mailto:volkmattj@gmail.com"><span style="unicode-bidi: bidi-override; direction: rtl;">moc.liamg@jttamklov</span></a></p><img style="margin: 0 auto;" src='https://media0.giphy.com/media/CDpAmfo9dbOyA/giphy.gif?cid=3640f6095be4f32d737452426baf3e84' />`);
  }
}

const renderImage = (response, i) => {

  if (response[i].image_url) {
    return `<img src="${response[i].image_url}" width="115" style="margin: 0 auto 15px auto;" />`;
  } else {
    return ``;
  }

}
