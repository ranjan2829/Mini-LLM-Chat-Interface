document.getElementById("generate-btn").addEventListener('click', async () => {
    const userInput = document.getElementById('user-input').value;
    const outputdiv = document.getElementById('output-ai');
    outputdiv.value = "Generating Response ------>>>";
    try {
        const response = await fetch('/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ input: userInput }),
        });
        const data = await response.json();

        if (response.ok) {
            outputdiv.value = data.response; // Correct this line
        } else {
            outputdiv.value = "Error! " + data.error;
        }
    } catch (error) {
        outputdiv.value = "Failed to get the Response error 404";
    }
});
