let button = document.getElementById('save-button');
let dropdown = document.getElementById('files-dropdown')

//-------------------------------------------------------------------------------------------
// Fetch file names from the Flask endpoint and populate the dropdown
//-------------------------------------------------------------------------------------------
fetch('/api/get_files')
.then(response => response.json())
.then(fileNames => {
    const dropdown = document.getElementById('files-dropdown');
    fileNames.forEach(fileName => {
        const option = document.createElement('option');
        option.text = fileName;
        option.value = fileName;
        dropdown.add(option);
    });
})
.catch(error => console.error('Error fetching file names:', error));

//-------------------------------------------------------------------------------------------
// Display the contents of the selected config file
//-------------------------------------------------------------------------------------------
dropdown.addEventListener('change', function() {
    const selectedFileName = this.value; // Get the selected file name

    if(selectedFileName == "empty") { // No file selected
        const fileContentContainer = document.getElementById('file-content-container');
        fileContentContainer.textContent = "";
        return;
    } 

    if (selectedFileName) {
        fetch(`/api/get_file_content?filename=${encodeURIComponent(selectedFileName)}`)
        .then(response => response.text())
        .then(content => {
            const fileContentContainer = document.getElementById('file-content-container');
            fileContentContainer.textContent = content;
        })
        .catch(error => console.error('Error fetching file content:', error));
    }
});

//-------------------------------------------------------------------------------------------
// Write the contents to the selected config
//-------------------------------------------------------------------------------------------
button.innerText = "Write to Config";
button.addEventListener('click', () => {
    const selectedFileName = document.getElementById('files-dropdown').value;
    const newContent = document.getElementById('file-content-container').textContent;

    // Send the updated content to the server for saving
    fetch('/api/save_file_content', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            filename: selectedFileName,
            content: newContent
        })
    })
    .then(response => {
        if (response.ok) {
            alert('Changes saved successfully!');
        } else {
            alert('Error saving changes. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error saving file content:', error);
        alert('Error saving changes. Please try again.');
    });
});