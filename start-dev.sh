#!/bin/bash

echo "Starting Zenith Dashboard Development Environment..."
echo

echo "Installing dependencies..."
npm install
npm run install:all

echo
echo "Starting development servers..."
echo "Frontend will be available at: http://localhost:5173"
echo "Backend API will be available at: http://localhost:8000"
echo "API Documentation: http://localhost:8000/docs"
echo

npm run dev
