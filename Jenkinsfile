pipeline {
    agent any

    tools {nodejs 'node8'}

    environment {
       CI = 'true'
    }
    stages {
        stage('InstallPackages'){
            steps{
                sh 'npm install'
            }
        }
        stage('Lint'){
            steps{
                sh 'npm run lint'
                sh 'npm run lint:fix'
            }
        }
        stage('Test'){
            steps{
                sh './jenkins/scripts/test.sh'
            }
        }

        stage('Build'){
            steps{
                sh 'npm run build'
            }
        }
        stage('Deliver') {
                    steps {
                        sh './jenkins/scripts/deliver.sh'
                        input message: 'Finished using the web site? (Click "Proceed" to continue)'
                        sh './jenkins/scripts/kill.sh'
                    }
                }
    }
}