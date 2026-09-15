import http from 'http';
import fs from 'fs';

const PORT = 3000;
const FILE_PATH = './students.json';

const server = http.createServer((req, res) => {
    
    //GET
    if (req.method === 'GET' && req.url === '/') {
        const htmlForm = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Student Records</title>
                <style>
                    body { font-family: Arial; padding: 40px; background: #f4f4f4; }
                    .container { background: white; padding: 20px; max-width: 400px; border-radius: 8px; }
                    input, button { display: block; width: 90%; margin-bottom: 15px; padding: 10px; }
                    button { background: #333; color: white; border: none; cursor: pointer; }
                </style>
            </head>
            <body>
                <div class="container">
                    <h2>Welcome to the Student Record Manager</h2>
                    <form action="/add-student" method="POST">
                        <input type="text" name="name" placeholder="Student Name" required />
                        <input type="text" name="roll" placeholder="Roll Number" required />
                        <input type="text" name="course" placeholder="Course" required />
                        <input type="email" name="email" placeholder="Email" required />
                        <button type="submit">Add Student</button>
                    </form>
                </div>
            </body>
            </html>
        `;
        
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(htmlForm);
    }

    //POST
    else if (req.method === 'POST' && req.url === '/add-student') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const formData = new URLSearchParams(body);
            const newStudent = {
                name: formData.get('name'),
                roll: formData.get('roll'),
                course: formData.get('course'),
                email: formData.get('email')
            };

            let students = [];
            if (fs.existsSync(FILE_PATH)) {
                const fileData = fs.readFileSync(FILE_PATH, 'utf-8');
                if (fileData) {
                    students = JSON.parse(fileData);
                }
            }

            students.push(newStudent);
            fs.writeFileSync(FILE_PATH, JSON.stringify(students, null, 2));

            res.writeHead(302, { 'Location': '/students' });
            res.end();
        });
    }

    //GET
    else if (req.method === 'GET' && req.url === '/students') {
        if (fs.existsSync(FILE_PATH)) {
            const data = fs.readFileSync(FILE_PATH, 'utf-8');
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(data);
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify([])); 
        }
    }

    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});