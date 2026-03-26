Feature: Food entry

  Scenario: Add a food entry and see it in the list
    Given I open the app
    When I add "Chicken" with 280 calories and 52g protein
    Then I should see "Chicken" in the entry list
    And the daily total should show 280 calories and 52g protein

  Scenario: Delete a food entry
    Given I open the app
    And I add "Chicken" with 280 calories and 52g protein
    And I add "Rice" with 200 calories and 4g protein
    When I delete "Chicken"
    Then I should not see "Chicken" in the entry list
    And I should see "Rice" in the entry list
    And the daily total should show 200 calories and 4g protein

  Scenario: Amount scaling from autocomplete
    Given I open the app
    And I add "Chicken breast" at 150g with 280 calories and 52g protein
    When I start typing "Chick" in the food name
    And I select "Chicken breast" from autocomplete
    And I change the amount to 200g
    Then the calories field should show 373
    And the protein field should show 69
