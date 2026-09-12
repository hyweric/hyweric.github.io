// Markdown is authored in this repository. Only render trusted project files.
async function loadProject() {
  const content = document.querySelector("[data-markdown]");
  if (!content) return;
  try {
    const response = await fetch(content.dataset.markdown, { cache: "no-cache" });
    if (!response.ok) throw new Error("Project could not be loaded.");
    content.innerHTML = marked.parse(await response.text());
    content.querySelectorAll("img").forEach((image) => {
      image.loading = "lazy";
      image.decoding = "async";
    });
    content.querySelectorAll("iframe").forEach((frame) => {
      frame.loading = "lazy";
      if (!frame.title) frame.title = "Project report or demonstration";
    });
  } catch (error) {
    content.replaceChildren();
    const message = document.createElement("p");
    message.className = "load-error";
    message.textContent = "The project could not load. Refresh the page, or ";
    const source = document.createElement("a");
    source.href = content.dataset.markdown;
    source.textContent = "read the Markdown file.";
    message.append(source);
    content.append(message);
  }
}
loadProject();
