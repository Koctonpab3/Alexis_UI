pipeline {
    agent any
    
    tools {nodejs 'node8'}
    
    steps {
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