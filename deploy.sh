echo "Pulling Repo"
git pull
echo "Installing Modules"
npm install
echo "Deploying migrations"
npx prisma migrate deploy
npx prisma generate
echo "Building"
npm run build
echo "Please Enter PM2 Service to Restart"
read pm2_service
pm2 restart $pm2_service
