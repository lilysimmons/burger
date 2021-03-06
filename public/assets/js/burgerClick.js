// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
    $(".devour").on("click", function (event) {
        var id = $(this).data("id");
        var newStatus = $(this).data("devoured");

        var newBurgerState = {
            status: newStatus
        };

        // Send the PUT request.
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newBurgerState
        }).then(
            function () {
                console.log("changed burger status", newStatus);
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });

    $("#submitBtn").on("click", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();

        var newBurger = {
            burger_name: $("#burgerName").val().trim(),
            devoured: false
        };
        //check to see if burger name exists
        if (newBurger.burger_name.length > 0) {
            // Send the POST request.
            $.ajax("/api/burgers", {
                type: "POST",
                data: newBurger
            }).then(
                function () {
                    console.log("created new Burger");
                    // Reload the page to get the updated list
                    location.reload();
                }
            );
        }
        else {
            alert("Submit form cannot be empty. Please fill me up - OM NOM NOM!");
        }

    });

    $(".remove-burger").on("click", function (event) {
        var id = $(this).data("id");

        // Send the DELETE request.
        $.ajax("/api/burgers/" + id, {
            type: "DELETE"
        }).then(
            function () {
                console.log("deleted burger", id);
                // Reload the page to get the updated list
                location.reload();
            })
    });
});
