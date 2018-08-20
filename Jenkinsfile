pipeline {
    agent any
    
    tools {nodejs 'nodejs'}
    
    stages {
        stage('InstallPackages'){
            sh 'npm install'
        }
        stage('Lint'){
            sh 'npm run lint'
            sh 'npm run lint:fix'
        }
        stage('Test'){
            steps{
                sh 'npm run test'
            }
        }

        stage('Build'){
            steps{
                sh 'npm run build'
            }
        }
    }
}