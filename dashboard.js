import { NhostClient } from "https://cdn.jsdelivr.net/npm/@nhost/nhost-js@latest/+esm";

// Initialize Nhost Client
const nhost = new NhostClient({
  subdomain: "ldexggoppwitfgltnaoo",
  region: "ap-south-1",
});

async function fetchNews() {
  const authToken = await nhost.auth.getSession()?.accessToken;

  const QUERY_NEWS_DIGEST = `
    query {
      news_digest {
        summary
        sentiment
      }
    }
  `;

  try {
    const response = await fetch("https://ldexggoppwitfgltnaoo.hasura.ap-south-1.nhost.run/v1/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(authToken ? { "Authorization": `Bearer ${authToken}` } : {}),
      },
      body: JSON.stringify({ query: QUERY_NEWS_DIGEST }),
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

    let sentimentColor = "#ddd"; // Default color
    if (news.sentiment === "Positive") sentimentColor = "#22c55e"; // Green
    else if (news.sentiment === "Negative") sentimentColor = "#ef4444"; // Red
    else if (news.sentiment === "Neutral") sentimentColor = "#facc15"; // Yellow

    newsCard.innerHTML = `
      <p>${news.summary}</p>
      <span class="sentiment" style="background: ${sentimentColor};">
        ${news.sentiment}
      </span>
    `;

    container.appendChild(newsCard);
  });
}

document.addEventListener("DOMContentLoaded", fetchNews);
