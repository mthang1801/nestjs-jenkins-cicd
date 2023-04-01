pipeline {	
	agent any
	stages { 		
		stage('Checkout Code') {
			steps{ 
				checkout scm  
			}       
        }		

		stage("Installation") {
			steps {
				sh "node -v"				
				sh "npm install"
			}			
		}

		stage("Test") {						
			steps { 						
				sh "npm test"
			}			
		}

		stage("Build And Push Image") {			
			environment { 
				DOCKER_TAG="${env.BUILD_NUMBER}"
				DOCKER_IMAGE="nestjs-svc"
			}
			steps {				
				withCredentials([usernamePassword(credentialsId: "docker-hub", usernameVariable: "DOCKER_USERNAME", passwordVariable: "DOCKER_PASSWORD")]){										
					sh "echo ${DOCKER_PASSWORD} | docker login -u ${DOCKER_USERNAME} --password-stdin"
					sh "docker build -t ${DOCKER_USERNAME}/${DOCKER_IMAGE}:${DOCKER_TAG} . --no-cache"
					sh "docker images | grep ${DOCKER_IMAGE}"
					sh "docker push ${DOCKER_USERNAME}/${DOCKER_IMAGE}:${DOCKER_TAG}"
					sh "docker tag ${DOCKER_USERNAME}/${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_USERNAME}/${DOCKER_IMAGE}:latest"
					sh "docker push ${DOCKER_USERNAME}/${DOCKER_IMAGE}:latest"				

					sh "docker rmi -t ${DOCKER_USERNAME}/${DOCKER_IMAGE}:${DOCKER_TAG}"
					sh "docker rmi -t ${DOCKER_USERNAME}/${DOCKER_IMAGE}:latest"
				}				
			}
		}
	}
	post {
		success {
			echo "installation success."
		}
		failure {
			echo "installation failed"
		}
	}
}