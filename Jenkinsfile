pipeline {
    agent any
    environment {
        CI = 'true'
    }
    stages {
        stage('InstallPackages') {
            steps {
                bat 'npm install'
            }
        }
        stage('Lint'){
            steps{
                bat 'npm run lint'
                bat 'npm run lint:fix'
            }
        }

        stage('Build'){
            steps{
                bat 'npm run build'
            }
        }
    }
}