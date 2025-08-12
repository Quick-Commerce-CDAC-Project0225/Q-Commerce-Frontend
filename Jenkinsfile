pipeline {
  agent any

  environment {
    DH              = credentials('dockerhub')
    IMAGE           = "jit0924/quick-frontend"
    DOCKER_BUILDKIT = '1'
  }

  options {
    timestamps()
    disableConcurrentBuilds()
  }

  triggers {
    githubPush()
  }

  stages {

    stage('Checkout') {
      steps { checkout scm }
    }

    stage('Docker Login') {
      steps {
        sh 'echo "$DH_PSW" | docker login -u "$DH_USR" --password-stdin'
      }
    }

    stage('Build & Push Frontend Image') {
      steps {
        script {
          def tag = sh(returnStdout: true, script: 'git rev-parse --short HEAD').trim()
          sh """
            set -e
            docker build -t ${IMAGE}:${tag} -t ${IMAGE}:latest .
            docker push ${IMAGE}:${tag}
            docker push ${IMAGE}:latest
          """
        }
      }
    }

    stage('Deploy Frontend (local)') {
      steps {
        sh '''
          set -e
          echo "$DH_PSW" | docker login -u "$DH_USR" --password-stdin
          docker compose -f /opt/quick/docker-compose.yml --env-file /opt/quick/.env pull frontend
          docker compose -f /opt/quick/docker-compose.yml --env-file /opt/quick/.env up -d frontend
          docker image prune -f
        '''
      }
    }
  }

  post {
    success {
      echo "✅ Deployed ${IMAGE}:latest to local EC2 via docker compose"
    }
    always {
      cleanWs()
    }
  }
}
