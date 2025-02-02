#!/bin/bash

# Conectarse a la instancia EC2 y desplegar los servicios
ssh -i "tu-clave.pem" ubuntu@184.72.166.195 << 'EOF'
  echo "Actualizando código en EC2..."
  cd ~/DelisHub || exit

  # Verificar si Docker está instalado, si no, instalarlo
  if ! command -v docker &> /dev/null
  then
      echo "Docker no encontrado, instalando..."
      sudo apt update
      sudo apt install -y docker.io
      sudo usermod -aG docker $USER
  fi

  # Verificar si Docker Compose está instalado, si no, instalarlo
  if ! command -v docker-compose &> /dev/null
  then
      echo "Docker Compose no encontrado, instalando..."
      sudo apt install -y docker-compose
  fi

  # Parar y eliminar contenedores antiguos
  docker-compose down

  # Limpiar imágenes antiguas
  docker system prune -af

  # Actualizar código desde GitHub
  git pull origin main

  # Construir y levantar los servicios
  docker-compose up -d --build

  # Verificar estado de los contenedores
  docker ps
EOF
