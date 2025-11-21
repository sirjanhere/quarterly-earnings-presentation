/* ----------------------------------------------------
   Simple Bar Chart for RevealJS
   (No external libraries required — works on GitHub Pages)
---------------------------------------------------- */

console.log("visualizations.js loaded");

// Sample quarterly revenue data (in crores)
const revenueData = [
  { quarter: "Q1", value: 120 },
  { quarter: "Q2", value: 145 },
  { quarter: "Q3", value: 132 },
  { quarter: "Q4", value: 158 }
];

// Create SVG bar chart
function renderBarChart() {
  const container = document.getElementById("revenue-chart");
  if (!container) return;

  // Clear previous chart (if slide revisited)
  container.innerHTML = "";

  const width = 600;
  const height = 320;
  const barWidth = 100;
  const barGap = 30;

  const maxVal = Math.max(...revenueData.map(d => d.value));
  const scale = height / maxVal;

  // Create SVG
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", width);
  svg.setAttribute("height", height);
  svg.style.background = "#f7f7f7";
  svg.style.borderRadius = "10px";

  // Create bars
  revenueData.forEach((d, i) => {
    const barHeight = d.value * scale;

    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", i * (barWidth + barGap));
    rect.setAttribute("y", height - barHeight);
    rect.setAttribute("width", barWidth);
    rect.setAttribute("height", barHeight);
    rect.setAttribute("fill", "#4a90e2");
    rect.style.transition = "all 0.6s ease";

    // Start bars at zero height (for animation)
    rect.setAttribute("height", 0);
    rect.setAttribute("y", height);

    svg.appendChild(rect);

    // Animate bars rising
    setTimeout(() => {
      rect.setAttribute("height", barHeight);
      rect.setAttribute("y", height - barHeight);
    }, 150 * i);

    // Label below bars
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.textContent = d.quarter;
    text.setAttribute("x", i * (barWidth + barGap) + barWidth / 2);
    text.setAttribute("y", height - 5);
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("fill", "#000");
    text.style.fontSize = "14px";
    svg.appendChild(text);
  });

  container.appendChild(svg);
}

/* ----------------------------------------------------
   Trigger chart when slide becomes active
---------------------------------------------------- */

Reveal.addEventListener("slidechanged", function (event) {
  const id = event.currentSlide.getAttribute("id");

  if (id === "chart-slide") {
    renderBarChart();
  }
});
