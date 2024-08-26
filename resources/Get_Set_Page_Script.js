

function send_data()
{
    const community = document.getElementById('community').value;
    const ipAddress = document.getElementById('ipAddress').value;
    const oids = document.getElementById('oids').value.split('\n').map(oid => oid.trim()).filter(oid => oid).join(',');

    if (community && ipAddress && oids) {
        console.log('Calling performSnmpGet with:', { community, ipAddress, oids });

        localStorage.setItem('community', community);
        localStorage.setItem('ipAddress', ipAddress);
        localStorage.setItem('oids', oids);

        javaObject.performSnmpGet(community, ipAddress, oids);
}else{

}

if(community === " " && ipAddress === " " && oids === " ")
{
    console.log("please enter the details");
}else{
    console.log("its alright");
}

}


function updateResult(resultText) {
    console.log('Updating result with:', resultText); // Debug log

    // Ensure each OID result is on a new line
    const formattedResult = resultText.split(' ').join('\n');
    document.getElementById('result').value = formattedResult;

    // Store the result in localStorage
    localStorage.setItem('result', formattedResult);
}


        // Load saved form data and result from localStorage
        function loadFormData() {
            const community = localStorage.getItem('community') || '';
            const ipAddress = localStorage.getItem('ipAddress') || '';
            const oids = localStorage.getItem('oids') || '';
            const result = localStorage.getItem('result') || '';

            document.getElementById('community').value = community;
            document.getElementById('ipAddress').value = ipAddress;
            document.getElementById('oids').value = oids;
            document.getElementById('result').textContent = result;
        }

        // Initialize form data and result when the page loads
        window.onload = loadFormData;

// Function to handle SNMP SET
function send_set_data() {
    var set_community = document.getElementById('set_community').value;
    var set_ipAddress = document.getElementById('set_ipAddress').value;
    var set_oid = document.getElementById('set_oid').value;
    var set_value = document.getElementById('set_value').value;


if(set_community === " " && set_ipAddress === " " && set_oid === " " && set_value === " ")
    {
    console.log("please enter the details");
    }else{
    console.log("its alright");
    }

    if (set_community && set_ipAddress && set_oid) {
        console.log('Calling performSnmpSet with:', { set_community, set_ipAddress, set_oid, set_value });
    
        localStorage.setItem('set_community', set_community);
        localStorage.setItem('set_ipAddress', set_ipAddress);
        localStorage.setItem('set_oid', set_oid);
        localStorage.setItem('set_value', set_value);
    
        javaObject.performSnmpSet(set_community, set_ipAddress, set_oid, set_value);
    }else{
    
    }

}



document.addEventListener('DOMContentLoaded', function() {

    
const online = document.getElementById('online');     
online.style.backgroundColor = 'green';

const offline = document.getElementById('offline');     
offline.style.backgroundColor = 'red';

});
