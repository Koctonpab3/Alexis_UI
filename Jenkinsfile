pipeline {
    agent any
    tools {nodejs “node”}
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