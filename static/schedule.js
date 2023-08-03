const addPlaybookButton = document.getElementById('add-playbook');
const playbookContainer = document.getElementById('playbook-container');

//------------------------------------------------------------------------------------------------
/// Playbook Dropdown Logic
// TODO: Only display playbooks based on the device selected
//------------------------------------------------------------------------------------------------
let playbookOptions = [
    'Playbook 1',
    'Playbook 2',
    'Playbook 3'
];

addPlaybookButton.addEventListener('click', () => { // Adds another playbook dropdown
        
    if(playbookContainer.children.length == playbookOptions.length) {
        console.log("DEBUG: Displaying all possible options.");
        return;
    }

    const newSelect = document.createElement('select');

    playbookOptions.forEach((option) => {
        const newOption = document.createElement('option');
        newOption.textContent = option;
        newOption.value = option;
        newSelect.appendChild(newOption);
    });

    playbookContainer.appendChild(newSelect);
    updatePlaybookOptions();
});

function updatePlaybookOptions() { // new playbook dropdowns only show unselected options

    const selects = playbookContainer.getElementsByTagName('select');
    const selectedOptions = new Set();

    for (const select of selects) {
        const selectedOption = select.value;
        selectedOptions.add(selectedOption);
    }

    const newOptions = playbookOptions.filter(option => !selectedOptions.has(option));
    const lastSelect = selects[selects.length - 1];
    lastSelect.innerHTML = '';

    newOptions.forEach((option) => {
        const newOption = document.createElement('option');
        newOption.textContent = option;
        newOption.value = option;
        lastSelect.appendChild(newOption);
    });
}

updatePlaybookOptions();

//------------------------------------------------------------------------------------------------
/// Cron Logic
// TODO: Covert the options selected into the crontab entry 
//------------------------------------------------------------------------------------------------
