def scmVars
def portNumber = 5000

def getGitBranchName() {
    return scm.branches[0].name
}

pipeline {	
	agent any
	stages { 	
		stage('Checkout Code') {			
			environment {
				scmVars = checkout scm
			}
			steps{							
				checkout scm  				
			}       
        }		

		stage("Environment")	 {
			environment {
				BRANCH_NAME = getGitBranchName()				
			}
			steps{ 
				script {
					sh "git --version"
					echo scmVars
					sh "echo 'branchName: ${BRANCH_NAME}'"  
				}
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
					sh "docker tag ${DOCKER_USERNAME}/${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_USERNAME}/${DOCKER_IMAGE}:latest"
					sh "docker images | grep ${DOCKER_IMAGE}"									
					sh "docker push ${DOCKER_USERNAME}/${DOCKER_IMAGE}:${DOCKER_TAG}"					
					sh "docker push ${DOCKER_USERNAME}/${DOCKER_IMAGE}:latest"										
					sh "docker rmi -f ${DOCKER_USERNAME}/${DOCKER_IMAGE}:${DOCKER_TAG}"
					sh "docker rmi -f ${DOCKER_USERNAME}/${DOCKER_IMAGE}:latest"
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