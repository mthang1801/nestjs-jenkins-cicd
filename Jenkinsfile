def scmVars
def portNumber = 5000
def buildUser = ''
def buildSuccess = false

def getGitBranchName() {
    return scm.branches[0].name
}

def getRepoName() {
    return scm.getUserRemoteConfigs()[0].getUrl().tokenize('/')[3].split("\\.")[0]
}

pipeline {	
	agent any
	stages { 	
		stage('Checkout Code') {						
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
					sh "echo 'branchName: ${BRANCH_NAME}'"  
					sh "docker -v"
					sh "printenv"
					echo "The build number is ${env.BUILD_NUMBER}"
					wrap([$class: 'BuildUser']){
						buildUser = env.BUILD_USER_ID + "-" + env.BUILD_USER 
					}
					echo "buildUser is : ${buildUser}"
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
				BRANCH_NAME = getGitBranchName()										
			}		
			steps {			
				script{
					try {
						echo "Branch Name is : ${BRANCH_NAME}"
						if (BRANCH_NAME == "*/master"){
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
						buildSuccess = true
					}catch(err) {
						throw err;					
					}
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