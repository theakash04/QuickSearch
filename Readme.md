# QuickFind
QuickFind is a web application designed to help users save, organize, and rediscover blog posts and articles they’ve read online. By saving URLs, extracting their content, and allowing keyword or vague description searches, QuickFind makes it easy to find that "lost blog" or article from the past, saving users time and effort.

# Watch the  to see QuickFind in action!

https://github.com/user-attachments/assets/ccf3552f-a4e1-4cfb-9a03-b0ab06201889

# Features
- Personalized Space: Each user has their own private space, accessible via Google login.
- Save URLs: Users can input URLs of blogs or articles to store their content.
- Smart Search: Search saved content using keywords to retrieve relevant results.
- Summarization: Generates concise summaries of saved articles using the Gemini API.
- Content Extraction: Utilizes Mozilla Readability to extract the main content from web pages.
- Content Management: Users can view their saved articles, including titles, links.


# How It Works
- Log in with your Google account to access your personal QuickFind space.
- Save a URL from any blog or article.
- QuickFind extracts and stores the content in a PostgreSQL database and indexes it in Elasticsearch for fast searching.
- Search using keywords and get results with the article’s title, link, and a summary powered by the Gemini API.
- Click on any result to view the full article in a new tab.
- View all saved articles in your Dashboard, where you can see the title, link and also go to the article.

# Tech Stack
- Frontend: React, Tailwind CSS
- Backend: Node.js, Express, Prisma
- Database: PostgreSQL
- Search: Elasticsearch
- Content Cleaning: Mozilla Readability
- Summarization: Gemini API
- Authentication: Google OAuth

# Purpose
QuickFind was built to solve the problem of searching through your vast amount of bookmarks that you have saved over the years. It allows you to save URLs and search through them using keywords, making it easier to find that one article you read a while back.
