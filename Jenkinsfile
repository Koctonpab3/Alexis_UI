pipeline {
    agent any
    
    tools {nodejs "node"}

    environment {
            CI = 'true'
        }
    stages {
        
        stage('Lint'){
            steps{
                sh 'npm run lint'
                sh 'npm run lint:fix'
            }
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

        stage('Deliver') {
                    steps {
                        sh './jenkins/scripts/deliver.sh'
                        input message: 'Finished using the web site? (Click "Proceed" to continue)'
                        sh './jenkins/scripts/kill.sh'
                    }
                }

    }
}