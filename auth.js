document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded");
  
    // Ensure window.Nhost is available
    if (!window.Nhost) {
      console.error("Nhost is not available. Make sure the script is correctly loaded.");
      return;
    }
  
    // ✅ Initialize Nhost using the correct global object
    const nhost = new window.Nhost.NhostClient({
      subdomain: "your-subdomain", // Replace with your actual subdomain
      region: "your-region", // Replace with your actual region (e.g., "eu-central-1" or "us-east-1")
    });
  
    console.log("Nhost initialized:", nhost);
  
    // ✅ Login function
    window.login = async function () {
      console.log("Login button clicked");
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
  
      try {
        const { session, error } = await nhost.auth.signIn({ email, password });
  
        if (error) {
          console.error("Login failed:", error.message);
          alert("Login failed: " + error.message);
        } else {
          console.log("Login successful", session);
          alert("Login successful!");
        }
      } catch (err) {
        console.error("Login error:", err);
      }
    };
  
    // ✅ Sign-up function
    window.signup = async function () {
      console.log("Sign Up button clicked");
      const email = document.getElementById("signup-email").value;
      const password = document.getElementById("signup-password").value;
  
      try {
        const { session, error } = await nhost.auth.signUp({ email, password });
  
        if (error) {
          console.error("Sign-up failed:", error.message);
          alert("Sign-up failed: " + error.message);
        } else {
          console.log("Sign-up successful", session);
          alert("Sign-up successful!");
        }
      } catch (err) {
        console.error("Sign-up error:", err);
      }
    };
  });
  