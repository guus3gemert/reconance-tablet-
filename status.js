async function checkIcecastStatus() {
  try {
    const response = await fetch("http://37.97.169.192:8000/status-json.xsl");
    const data = await response.json();

    const source = data.icestats?.source;

    if (source && source.listenurl && source.listenurl.includes("/live.mp3")) {
      setState("live");
      console.log("Icecast stream is live");
    } else {
      setState("idle");
      console.log("Icecast stream is idle");
    }
  } catch (error) {
    console.error("Could not reach Icecast status:", error);
  }
}

checkIcecastStatus();
setInterval(checkIcecastStatus, 5000);