/**
 * Client-side JavaScript for Recipe Management - Home Page
 * Uses jQuery for AJAX calls and DOM manipulation
 * Author: Jayden Montez
 */

/**
 * Function to load categories from database
 */
function loadCategories() {
    $.ajax({
      url: '/api/categories',
      method: 'GET',
      success: function(categories) {
        // Clear existing options except first one
        $('#category').find('option:not(:first)').remove();
        
        // Add each category to dropdown
        categories.forEach(function(category) {
          $('#category').append(
            $('<option></option>').val(category.id).text(category.name)
          );
        });
      },
      error: function() {
        alert('Error loading categories');
      }
    });
  }
  
  /**
   * Function to load recipes from database
   */
  function loadRecipes() {
    $.ajax({
      url: '/api/recipes',
      method: 'GET',
      success: function(recipes) {
        // Clear the recipes list
        $('#recipesList').empty();
        
        // Check if there are recipes
        if (recipes.length === 0) {
          $('#recipesList').html('<p>No recipes yet. Add one above!</p>');
          return;
        }
        
        // Loop through each recipe and display it
        recipes.forEach(function(recipe) {
          const recipeCard = `
            <div class="recipe-card">
              <h3>${recipe.name}</h3>
              <p>${recipe.description}</p>
              <div class="recipe-info">
                Prep Time: ${recipe.prep_time} minutes
              </div>
            </div>
          `;
          $('#recipesList').append(recipeCard);
        });
      },
      error: function() {
        $('#recipesList').html('<p>Error loading recipes</p>');
      }
    });
  }
  
  /**
   * Function to handle form submission
   */
  function handleFormSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const formData = {
      name: $('#name').val(),
      description: $('#description').val(),
      prep_time: $('#prep_time').val(),
      category_id: $('#category').val()
    };
    
    // Send AJAX POST request
    $.ajax({
      url: '/api/recipes',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(formData),
      success: function(response) {
        // Show success message
        $('#message').html('Recipe added successfully!').addClass('success').removeClass('error');
        
        // Clear the form
        $('#addRecipeForm')[0].reset();
        
        // Reload recipes
        loadRecipes();
        
        // Hide message after 3 seconds
        setTimeout(function() {
          $('#message').html('').removeClass('success');
        }, 3000);
      },
      error: function() {
        $('#message').html('Error adding recipe').addClass('error').removeClass('success');
      }
    });
  }
  
  /**
   * jQuery document ready function
   * Runs when the page is fully loaded
   */
  $(document).ready(function() {
    // Load categories and recipes when page loads
    loadCategories();
    loadRecipes();
    
    // Attach form submit handler
    $('#addRecipeForm').on('submit', handleFormSubmit);
  });