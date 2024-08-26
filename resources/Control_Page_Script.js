// async function fetchData() {
//     try {
//         const response = await fetch('write.txt');
//         const text = await response.text();
//         return text.trim(); // Ensure there are no extra whitespace characters
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         return null;
//     }
// }

// // Function to update a specific dropdown based on the OID and value
// function updateDropdown(dropdownId, targetOid, data) {
//     const dropdown = document.getElementById(dropdownId);
//     const lines = data.split('\n');
//     let foundValue = null;

//     for (const line of lines) {
//         if (line.startsWith(targetOid)) {
//             // Extract value after the OID
//             const value = line.split(':')[1].trim();
//             if (value === '0' || value === '1') {
//                 foundValue = value;
//             }
//             break; // Exit loop once the desired OID is found
//         }
//     }

//     if (foundValue !== null) {
//         dropdown.value = foundValue;
//     } else {
//         console.warn(`OID ${targetOid} not found or unexpected value.`);
//     }
// }

// // Main function to update all dropdowns
// async function updateDropdowns() {
//     const data = await fetchData();

//     if (data !== null) {
//         // Update the first dropdown (rfmute_layout)
//         updateDropdown('rfmute_layout', '1.3.6.1.2.1.1.7.0', data);

//         // Update the second dropdown (extref_layout)
//         updateDropdown('extref_layout', '1.3.6.1.2.1.1.8.0', data);
//     } else {
//         console.error('Failed to update dropdowns due to data fetching issue.');
//     }
// }

// // Fetch and update dropdowns every 5 seconds
// // setInterval(updateDropdowns, 5000);
// 30000
// setInterval(updateDropdowns, 30000);

// // Initial call to update dropdowns immediately upon page load
// updateDropdowns();


async function fetchData() {
    try {
        const response = await fetch('write.txt');
        const text = await response.text();
        return text.trim(); // Ensure there are no extra whitespace characters
    } catch (error) {
        console.warn('Error fetching data:', error); // Changed to console.warn
        return null;
    }
}

// Function to update a specific dropdown based on the OID and value
function updateDropdown(dropdownId, targetOid, data) {
    const dropdown = document.getElementById(dropdownId);
    const lines = data.split('\n');
    let foundValue = null;

    for (const line of lines) {
        if (line.startsWith(targetOid)) {
            // Extract value after the OID
            const value = line.split(':')[1].trim();
            if (value === '0' || value === '1') {
                foundValue = value;
            }
            break; // Exit loop once the desired OID is found
        }
    }

    if (foundValue !== null) {
        dropdown.value = foundValue;
    } else {
        console.warn(`OID ${targetOid} not found or unexpected value.`); // Changed to console.warn
    }
}

// Main function to update all dropdowns
async function updateDropdowns() {
    const data = await fetchData();

    if (data !== null) {
        // Update the first dropdown (rfmute_layout)
        updateDropdown('rfmute_layout', '1.3.6.1.2.1.1.9.0', data);

        // Update the second dropdown (extref_layout)
        updateDropdown('extref_layout', '1.3.6.1.2.1.1.8.0', data);
    } else {
        console.warn('Failed to update dropdowns due to data fetching issue.'); // Changed to console.warn
    }
}

// Fetch and update dropdowns every 30 seconds
setInterval(updateDropdowns, 30000);

// Initial call to update dropdowns immediately upon page load
updateDropdowns();






function perform_extref()
{
    // window.location.href = 'Monitor_Page.html';
    var extrefValue = document.getElementById("extref_layout").value;

    var set_community = "public";
    var set_ipAddress = "127.0.0.1";
    var set_oid = "1.3.6.1.2.1.1.5.0";
    var set_value = extrefValue;

    javaObject.performSnmpSet(set_community, set_ipAddress, set_oid, set_value);
}

function perform_rfmuteset()
{
    var rfmuteValue = document.getElementById("rfmute_layout").value;

    var set_community = "public";
    var set_ipAddress = "127.0.0.1";
    var set_oid = "1.3.6.1.2.1.1.5.0";
    var set_value = rfmuteValue;

    javaObject.performSnmpSet(set_community, set_ipAddress, set_oid, set_value);

}


function perform_digital_attn_set()
{
    var digital_attn_value = document.getElementById("digital_attn_layout").value;
    var da_mv = digital_attn_value *100;
    var set_community = "public";
    var set_ipAddress = "127.0.0.1";
    var set_oid = "1.3.6.1.2.1.1.5.0";
    var set_value = da_mv;

    javaObject.performSnmpSet(set_community, set_ipAddress, set_oid, set_value);   
}




//======================================================================================


document.addEventListener('DOMContentLoaded', () => {
    // Function to fetch digital attention value and update the dropdown
    function fetchDigitalAttn() {
        fetch('write.txt')
            .then(response => response.text())
            .then(text => {
                // Extract the number from the text (assuming the format is "1.3.6.1.2.1.1.7.0 : 76")
                const valueMatch = text.match(/:\s*(\d+)/);
                if (valueMatch) {
                    const number = parseInt(valueMatch[1], 10);
                    const result = (number / 100).toFixed(2);

                    // Update the dropdown with the new digital attention value
                    updateDigitalAttn(result);
                } else {
                    console.error('Failed to parse the number from the text file.');
                }
            })
            .catch(error => console.error('Error fetching the text file:', error));
    }

    // Function to update the dropdown with the new digital attention value
    function updateDigitalAttn(selectedValue) {
        const selectElement = document.getElementById('digital_attn_layout');

        // Clear current options
        selectElement.innerHTML = '';

        // Create a list of options
        const options = [];
        for (let i = 0; i <= 31; i += 0.25) {
            const value = i.toFixed(2);
            const option = document.createElement('option');
            option.value = value;
            option.textContent = value;
            options.push(option);
        }

        // Append options to the select element
        options.forEach(option => selectElement.appendChild(option));

        // Set the selected value
        selectElement.value = selectedValue;
    }

    // Fetch and update immediately when the page loads
    fetchDigitalAttn();

    // Set up the interval to fetch and update every 30 seconds
    setInterval(fetchDigitalAttn, 5000); // 30000 milliseconds = 30 seconds
});
