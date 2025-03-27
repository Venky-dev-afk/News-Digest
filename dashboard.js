import { NhostClient } from "https://cdn.jsdelivr.net/npm/@nhost/nhost-js@latest/+esm";

// Initialize Nhost Client
const nhost = new NhostClient({
  subdomain: "ldexggoppwitfgltnaoo",
  region: "ap-south-1",
});

// ✅ Logout Function
document.getElementById("logout-btn").addEventListener("click", async () => {
  try {
    await nhost.auth.signOut();
    alert("Logged out successfully!");
    window.location.href = "Landing_Page.html"; // Redirect to login page
  } catch (error) {
    console.error("Logout failed:", error);
  }
});

// ✅ Protect Dashboard: Redirect if not logged in
async function checkAuth() {
  const isAuthenticated = await nhost.auth.isAuthenticatedAsync();
  if (!isAuthenticated) {
    window.location.href = "index.html"; // Redirect to login page
  }
}

checkAuth(); // Call function to check login status

// ✅ Check if the user is logged in
const authToken = window.localStorage.getItem("authToken");
if (!authToken) {
  window.location.href = "login.html"; // Redirect to login if not authenticated
}

// GraphQL Query for fetching news
const QUERY_NEWS_DIGEST = `
  query {
    news_digest {
      summary
      sentiment
    }
  }
`;

async function fetchNews() {
  try {
    const response = await fetch("https://ldexggoppwitfgltnaoo.hasura.ap-south-1.nhost.run/v1/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}` // ✅ Use stored token
      },
      body: JSON.stringify({ query: QUERY_NEWS_DIGEST })
    });

    const data = await response.json();

    if (data.errors) {
      console.error("GraphQL Error:", data.errors);
    } else {
      console.log("News Data:", data.data.news_digest);
      displayNews(data.data.news_digest);
    }
  } catch (error) {
    console.error("Fetch Error:", error);
  }
}

function displayNews(newsArticles) {
  const container = document.getElementById("news-container");
  container.innerHTML = "";

  newsArticles.forEach(news => {
    const newsCard = document.createElement("div");
    newsCard.classList.add("news-card");

    let sentimentColor = "#ddd";
    if (news.sentiment === "Positive") sentimentColor = "#22c55e";
    else if (news.sentiment === "Negative") sentimentColor = "#ef4444";
    else if (news.sentiment === "Neutral") sentimentColor = "#facc15";

    newsCard.innerHTML = `
      <div class="card-content">
        <p class="news-summary">${news.summary}</p>
        <span class="sentiment" style="background: ${sentimentColor};">${news.sentiment}</span>
      </div>
    `;

    container.appendChild(newsCard);
  });
}

// ✅ Fetch news on page load
document.addEventListener("DOMContentLoaded", fetchNews);
  