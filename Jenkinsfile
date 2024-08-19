pipeline {
    agent any

    environment {
        AWS_ACCESS_Key_ID = credentials('AWS_ACCESS_KEY')
        AWS_SECRET_ACCESS_KEY = credentials('AWS_SECRET_ACCESS_KEY')
        AWS_REGION = 'eu-central-1'
        ECR_REPO = '533267283761.dkr.ecr.eu-central-1.amazonaws.com/user'
        CLUSTER_NAME = 'InternRFC-cluster'
    }

    stages {
        stage ('Checkout') {
            steps {
                git url: 'https://github.com/tamim-hmizi/InternRFC-User.git', branch: 'main'
            }
        }

        stage('Docker Build & Push') {
            steps {
                script {
                    sh 'aws ecr get-login-password --region &AWS_REGION | docker login --username AWS --password-stdin $ECR_REPO'

                    sh 'docker build -t $ECR_REPO:latest .'

                    sh 'docker tag $ECR_REPO:latest $ECR_REPO:latest'

                    sh 'docker push $ECR_REPO:latest'
                }
            }
        }

        stage ('Configure kubectl') {
            steps {
                script {
                   
                    sh 'apt install awscli'
                    
                    sh 'aws eks update-kubeconfig --name $CLUSTER_NAME --region &AWS_REGION'

                }
            }
        }

        stage ('Deploy to EKS') {
            steps {
                script {
                    sh 'kubectl apply -f k8s/deployment.yaml'

                    sh 'kubectl apply -f k8s/service.yaml'

                }
            }
        }
    }
}