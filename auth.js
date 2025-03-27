document.addEventListener("DOMContentLoaded", async function () {
  console.log("DOM fully loaded");

  if (!window.Nhost) {
    console.error("Nhost is not available.");
    return;
  }

  // ✅ Initialize Nhost
  const nhost = new window.Nhost.NhostClient({
    subdomain: "ldexggoppwitfgltnaoo",
    region: "ap-south-1",
  });

  console.log("Nhost initialized:", nhost);

  // ✅ Check if user is already authenticated
  const isAuthenticated = await nhost.auth.isAuthenticatedAsync();
  if (isAuthenticated) {
    console.log("User already signed in. Redirecting to dashboard...");
    window.location.href = "dashboard.html"; // ✅ Redirect immediately
  }

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
        window.localStorage.setItem("authToken", session.accessToken); // Store token
        window.location.href = "dashboard.html"; // ✅ Redirect to dashboard
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
        window.localStorage.setItem("authToken", session.accessToken); // Store token
        window.location.href = "dashboard.html"; // ✅ Redirect to dashboard
      }
    } catch (err) {
      console.error("Sign-up error:", err);
    }
  };
});
