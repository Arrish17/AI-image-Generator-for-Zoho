function generateImage() {
    const prompt = document.getElementById('prompt').value;
    const outputDiv = document.getElementById('output');
    
    if (!prompt) {
        outputDiv.innerHTML = "<p style='color: red;'>Please enter a prompt to generate an image.</p>";
        return;
    }

    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1024&height=1024`;

    // Display loading message before image is generated
    outputDiv.innerHTML = "<p>Loading...</p>";

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to generate image");
            }
            return response.blob();
        })
        .then(imageBlob => {
            const imageUrl = URL.createObjectURL(imageBlob);
            outputDiv.innerHTML = `<img src="${imageUrl}" alt="Generated Image" />`;
        })
        .catch(error => {
            outputDiv.innerHTML = `<p style='color: red;'>Error: ${error.message}</p>`;
        });
}
