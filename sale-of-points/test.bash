ssh -i /path/to/your/rsa_key [username]@[vps-ip-address]

In Our Case is:
ssh -i .\Downloads\capasa.pem ubuntu@52.64.216.37

root@ip-172-31-0-185:/home/ubuntu/NodeJs/PointofSale# /
sudo apt update
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
// install nvm for get the leastest Node version
nvm install node
node --version
npm --version
// For checking if node is install
git clone <git.repo>
npm install
// Download all the dependency for the application
npm install pm2 -g
//Download pm2 for the running node application in background process


apt install mysql
sudo mysql_secure_installation
sudo systemctl restart mysql

sudo mysql
CREATE DATABASE pos;
// connect to the mysql instance in the VPS
CREATE USER 'your_username'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON your_database.* TO 'your_username'@'localhost';
FLUSH PRIVILEGES;
EXIT;

PORT=3000
MAILPORT=587
MAILHOST='smtp.gmail.com'
ADMINEMAIL='doquan23032003@gmail.com'
ADMINPASSWORD='pxgy xqcv hkvk jnbf'
JWT_SECRET_KEY='JWT_SECRET_KEY'
URL='http://52.64.216.37/'
DATABASE_HOST="127.0.0.1"
DATABASE_NAME="pos"
DATABASE_USERNAME="nhutanh"
DATABASE_PASSWORD=''
DB_PRODUCTION_HOST="127.0.0.1"
DB_PRODUCTION_NAME="pos"
DB_PRODUCTION_USERNAME="root"
DB_PRODUCTION_PASSWORD=''


sudo install nginx -y

// /etc/nginx/sites-enabled
server {
        listen 80;

        server_name hocnodecungcapasa.fun;

        ssl_certificate_key /etc/letsencrypt/keys/0000_key-certbot.pem;

        location / {
                proxy_pass http://localhost:3000;
                proxy_set_header Host $host;
                proxy_set_header x_real-IP $remote_addr;
        }
}


root@ip-172-31-0-185:/home/ubuntu/NodeJs/PointofSale# pm2 start index.js
[PM2] Spawning PM2 daemon with pm2_home=/root/.pm2
[PM2] PM2 Successfully daemonized
[PM2] Starting /home/ubuntu/NodeJs/PointofSale/index.js in fork_mode (1 instance)
[PM2] Done.
┌────┬──────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id │ name     │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
├────┼──────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 0  │ index    │ default     │ 1.0.0   │ fork    │ 44748    │ 0s     │ 0    │ online    │ 0%       │ 37.6mb   │ root     │ disabled │
└────┴──────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘
root@ip-172-31-0-185:/home/ubuntu/NodeJs/PointofSale#


