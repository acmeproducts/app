
const PROXY_URL = 'https://oauth-proxy-3idr.onrender.com';
let accessToken = '';
const fetchBtn = document.getElementById('fetch-btn');

function getAccessTokenAndProceed() {
    fetch(`${PROXY_URL}/google/refresh`)
    .then(response => {
        if (!response.ok) throw new Error('No refresh token');
        return response.json();
    })
    .then(data => {
        accessToken = data.access_token;
        fetchBtn.disabled = false;
        fetchTrashFiles();
    })
    .catch(() => {
        window.location.href = `${PROXY_URL}/google/auth`;
    });
}

function fetchTrashFiles() {
    if (!accessToken) return;
    fetch('https://www.googleapis.com/drive/v3/files?q=trashed=true&fields=files(id,name,size,createdTime)', {
        headers: { 'Authorization': `Bearer ${accessToken}` }
    })
    .then(response => response.json())
    .then(data => {
        const tableBody = document.querySelector('#trash-files-table tbody');
        tableBody.innerHTML = '';
        data.files.forEach(file => {
            const row = document.createElement('tr');
            row.innerHTML = `<td><a href="https://drive.google.com/file/d/${file.id}/view" target="_blank">${file.name}</a></td>
                             <td>${file.size ? file.size + ' bytes' : 'N/A'}</td>
                             <td>${file.createdTime ? new Date(file.createdTime).toLocaleDateString() : 'N/A'}</td>`;
            tableBody.appendChild(row);
        });
        document.getElementById('trash-files-table').hidden = false;
    });
}

window.onload = getAccessTokenAndProceed;
