pipeline {
    agent {
        docker {
            image 'node:6-alpine'
            args '-p 3000:3000'
        }
    }
    environment {
        CI = 'true'
    }
    stages {
        stage('InstallPackages') {
            steps {
                sh 'npm install'
            }
        }
        stage('Lint'){
            steps{
                sh 'npm run lint'
                sh 'npm run lint:fix'
            }
        }

        stage('Build'){
            steps{
                sh 'npm run build'
            }
        }
    }
}