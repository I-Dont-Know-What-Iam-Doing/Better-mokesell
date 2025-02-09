// WRITING IN TO MOKESELL
// Feedback Submission
document.addEventListener('DOMContentLoaded', function () {
    // Initialize EmailJS
    emailjs.init("W0cqrnt2mEq3Kc18T"); // Replace with your EmailJS Public Key
  
    // Function to send confirmation email via EmailJS
    async function sendEmail(name, email, feedback) {
        try {
            let response = await emailjs.send("service_7jt1pn9", "template_64j76bj", {
                user_name: name,
                user_email: email,
                user_feedback: feedback
            });
  
            console.log("✅ Email sent successfully!", response);
            alert("A confirmation email has been sent to your email.");
        } catch (error) {
            console.error("❌ Error sending email:", error);
            alert("Failed to send email. Please try again later.");
        }
    }
  
    // Submit Feedback Function (Handles Formspree + EmailJS)
    window.submitFeedback = async function (token) {
        const category = document.getElementById('feedback-category').value;
        const feedbackText = document.getElementById('feedback-text').value.trim();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
  
        if (!feedbackText || !name || !email) {
            alert("⚠ Please fill in all required fields.");
            return;
        }
  
        try {
            // Step 1: Send to Formspree
            let formspreeResponse = await fetch("https://formspree.io/f/xovjljlp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, feedback: feedbackText })
            });
  
            let formspreeData = await formspreeResponse.json();
  
            if (formspreeData.ok) {
                alert("✅ Feedback submitted successfully!");
  
                // Step 2: Send confirmation email via EmailJS
                sendEmail(name, email, feedbackText);
  
                // Clear form fields
                document.getElementById("feedback-form").reset();
            } else {
                alert("❌ Error submitting feedback. Please try again.");
            }
        } catch (error) {
            console.error("❌ Form submission error:", error);
            alert("An error occurred. Please try again later.");
        }
    };
  });