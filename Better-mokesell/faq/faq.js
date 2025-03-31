document.addEventListener("DOMContentLoaded", function () {
    const faqs = document.querySelectorAll(".faq");

    faqs.forEach(faq => {
        faq.addEventListener("click", function () {
            // Close all other FAQs
            faqs.forEach(item => {
                if (item !== faq) {
                    item.classList.remove("active");
                }
            });

            // Toggle clicked FAQ
            faq.classList.toggle("active");
        });
    });
});