const fs = require('fs');
const https = require('https');

const dir = 'stitch_screens';
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      res.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest);
      reject(err);
    });
  });
}

async function main() {
  await downloadFile('https://lh3.googleusercontent.com/aida/ADBb0uhB21jcpQGpvJRi_BzF-KY0l6Q5jRk7puL1IrxlhBydyI-kb-2ARQGogHpPnNi56SDsqXCjuD0OgVeae1nXRkieURIfa1A0t2YaDzBFWpL3U8Pw-nxVwEvRLyTj5Vzmh5mIfcftpC0l7WnT496cpATHRBBk4Ye5m90R8TUIxjE-bkEU19Ny9zBl-60vnZyAkFI-XOkzSVUApZVt74IMcr1kXolkDu6OjTBFvvpL8k7yCh3M4IXCyPlA2Q', 'stitch_screens/landing_page_screenshot.png');
  await downloadFile('https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ6Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpZCiVodG1sXzlhYzdkMDhlM2RjZDRlMDNhMDIxY2VmZWE4NzM2MDExEgsSBxDS6JaTvAUYAZIBIgoKcHJvamVjdF9pZBIUQhI4NDU0OTI3ODg0MzIxMTc4MDM&filename=&opi=89354086', 'stitch_screens/landing_page.html');
  console.log('Downloaded successfully.');
}

main().catch(console.error);
