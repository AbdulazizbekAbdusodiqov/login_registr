import http from "http";
import fs from "fs";
import path from "path";
import { log } from "console";

const app = http.createServer((req, res) => {
    // console.log(req.method);
    // console.log(req.url);

    const dataPath = path.join(process.cwd(), "data", "data.json")

    let dataJson = fs.readFileSync(dataPath, "utf-8")
    dataJson = JSON.parse(dataJson)

    if (req.method === "GET" && req.url === "/login") {
        const loginData = fs.readFileSync(
            path.join(process.cwd(), "public", "login.html")
        );

        res.writeHead(200, {
            "Content-type": "text/html",
        });

        res.write(loginData);
        res.end();
    } else if (req.method === "GET" && req.url === "/registr") {
        const loginData = fs.readFileSync(
            path.join(process.cwd(), "public", "registr.html")
        );

        res.writeHead(200, {
            "Content-type": "text/html",
        });

        res.write(loginData);
        res.end();
    } else if (req.method === "GET" && req.url === "/css/style.css") {
        const loginData = fs.readFileSync(
            path.join(process.cwd(), "css", "style.css")
        );

        res.writeHead(200, {
            "Content-type": "text/css",
        });

        res.write(loginData);
        res.end();
    } else if (req.url === "/img/background.jpeg") {
        const loginData = fs.readFileSync(
            path.join(process.cwd(), "img", "background.jpeg")
        );

        res.writeHead(200, {
            "Content-type": "text/img",
        });
        res.write(loginData);
        res.end();
    } else if (req.url === "/img/background.jpeg") {
        const loginData = fs.readFileSync(
            path.join(process.cwd(), "img", "background.jpeg")
        );

        res.writeHead(200, {
            "Content-type": "text/img",
        });

        res.write(loginData);
        res.end();
    } else if (req.method === "POST" && req.url === "/registr") {

        const loginData = fs.readFileSync(
            path.join(process.cwd(), "public", "registr.html")
        );

        res.writeHead(200, {
            "Content-type": "text/html",
        });


        let body = "";

        req.on("data", (chunk) => {
            body += chunk.toString()
        });
        req.on("end", () => {
            body = body.split("&")

            let obj = {}
            for (let i = 0; i < body.length; i++) {
                body[i] = body[i].split("=")
                if (body[i][1]) {
                    if (body[i][0] != "confirmPassword") {
                        obj[body[i][0]] = body[i][1]
                    }
                }
                else {
                    res.write(loginData);
                    res.end(`<br>
                        <p style= "color: red;">Iltimos barcha bolimlarni toldiring</p>
                    `);
                    return
                }
            }
            if(body[1][1] != body[2][1]){
                res.write(loginData);
                res.end(`<br>
                    <p style= "color: red;">Parol to'g'ri kelmadi! Iltimos qaytadan tekshirib koring!</p>
                `);
                return
            }
            else if(obj["username"].length < 5){
                res.write(loginData);
                res.end(`<br>
                    <p style= "color: red;">Username kamida 5 ta belgidan iborat bolishi kerak!</p>
                `);
                return
            }
            else if(obj["password"].length < 5){
                res.write(loginData);
                res.end(`<br>
                    <p style= "color: red;">Parol kamida 5 ta belgidan iborat bolishi kerak!</p>
                `);
                return
            }
            for(let user of dataJson){
                
                if(user["username"] === obj["username"]){
                    res.write(loginData);
                    res.end(`<br>
                        <p style= "color: red;">Bu username bilan ro'yxatdan o'tilgan!</p>
                    `);
                    return
                }else if(String(user["email"]) === String(obj["email"] ) ){
                    res.write(loginData);
                    res.end(`<br>
                        <p style= "color: red;">Bu email bilan ro'yxatdan o'tilgan!</p>
                    `);
                    return
                }
            }
            dataJson.push(obj)

            fs.writeFileSync(dataPath, JSON.stringify(dataJson))
            res.write(loginData);
            res.end(`<br>
                <p style= "color: green;">Tabriklayman muvaffaqiyatli ro'yxatdan o'tdingiz!</p>
            `);

        })
    }else if (req.method === "POST" && req.url === "/login") {
        
        
        let body = "";
        
        req.on("data", (chunk) => {
            body += chunk.toString()
        });
        req.on("end", () => {

            const loginData = fs.readFileSync(
                path.join(process.cwd(), "public", "login.html")
            );
    
            const massageData = fs.readFileSync(
                path.join(process.cwd(), "public", "massage.html")
            );
    
            res.writeHead(200, {
                "Content-type": "text/html",
            });

            body = body.split("&")

            let obj = {}
            for (let i = 0; i < body.length; i++) {
                body[i] = body[i].split("=")
                if (body[i][1]) {
                    obj[body[i][0]] = body[i][1]
                }
                else {
                    res.write(loginData);
                    res.end(`<br>
                        <p style= "color: red;">Iltimos barcha bolimlarni toldiring</p>
                    `);

                    return
                }
            }
            
            for(let user of dataJson){
                if(user["username"] === obj["username"] && user["password"] === obj["password"]){
                    res.end(massageData);
                    return 0
                }
            }
            res.write(loginData);
            res.end(`<br>
                <p style= "color: #fff;">Bunday ma'lumot topilmadi iltimos royxatdan o'ting!</p>
            `);

            return

        })
    }
    
});

app.listen(5001, () => {
    console.log("Hammasi nazorat ostida\nport:5001");
});
