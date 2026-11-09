$("#size-select").on("change", function () {
    const selectedSize = $(this).val();
    const rows = $(".size-table").find("tbody tr");

    rows.each(function () {
        const row = $(this);
        const size = row.children("th").text().trim();
        row.toggleClass("size-selected", size === selectedSize);
    });

    const message = $("#size-message");
    message.stop(true, true).hide();

    if (selectedSize) {
        message.text("✓ Size " + selectedSize + " selected. See the highlighted row.");
        message.fadeIn(150);
    }
});

$(".measure-button").on("click", function () {
    const button = $(this);
    const text = button.next(".measure-text");
    const isOpen = button.attr("aria-expanded") === "true";

    button.attr("aria-expanded", String(!isOpen));
    button.find("span").text(isOpen ? "+" : "−");
    text.stop(true, true);

    if (isOpen) {
        text.slideUp(180);
    } else {
        text.slideDown(180);
    }
});