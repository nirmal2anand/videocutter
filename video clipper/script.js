document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("process-btn").addEventListener("click", processVideo);
  });
  
  function processVideo() {
    const container = document.getElementById("clips-container");
    container.innerHTML = '';
    document.getElementById("error-message").style.display = 'none';
    document.getElementById("loading").style.display = 'block';
  
    const url = document.getElementById("youtube-url").value.trim();
    const videoId = extractVideoId(url);
    const clipLength = parseInt(document.getElementById("clip-length").value);
  
    if (!videoId) {
      showError("Invalid YouTube URL.");
      return;
    }
  
    createClips(videoId, clipLength);
  }
  
  function extractVideoId(url) {
    const patterns = [
      /(?:youtube\.com\/watch\?v=)([^&]+)/,
      /youtu\.be\/([^?]+)/,
      /youtube\.com\/embed\/([^?]+)/
    ];
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  }
  
  function createClips(videoId, clipLength) {
    const container = document.getElementById("clips-container");
    const totalClips = 4; // Adjust based on how many clips you want
  
    for (let i = 0; i < totalClips; i++) {
      const start = i * clipLength;
      const end = start + clipLength;
  
      const clipDiv = document.createElement("div");
      clipDiv.className = "clip";
  
      const title = document.createElement("h3");
      title.textContent = `Clip ${i + 1}: ${formatTime(start)} - ${formatTime(end)}`;
      clipDiv.appendChild(title);
  
      const iframe = document.createElement("iframe");
      iframe.width = "100%";
      iframe.height = "315";
      iframe.src = `https://www.youtube.com/embed/${videoId}?start=${start}&end=${end}&rel=0`;
      iframe.frameBorder = "0";
      iframe.allow = "autoplay; encrypted-media";
      iframe.allowFullscreen = true;
      clipDiv.appendChild(iframe);
  
      const link = document.createElement("a");
      link.href = `https://www.youtube.com/watch?v=${videoId}&t=${start}s`;
      link.target = "_blank";
      link.className = "youtube-btn";
      link.textContent = "Watch on YouTube";
      clipDiv.appendChild(link);
  
      container.appendChild(clipDiv);
    }
  
    document.getElementById("loading").style.display = "none";
  }
  
  function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec.toString().padStart(2, '0')}`;
  }
  
  function showError(message) {
    const errorDiv = document.getElementById("error-message");
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    document.getElementById("loading").style.display = "none";
  }
  