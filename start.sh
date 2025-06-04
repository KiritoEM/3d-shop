#!/bin/sh

echo "En attente de PostgreSQL..."
while ! nc -z postgres 5432; do 
  sleep 1
done

echo "PostgreSQL est prêt !"

echo "Exécution des migrations..."
npx prisma migrate deploy

echo "Démarrage de l'application..."
exec node server.js