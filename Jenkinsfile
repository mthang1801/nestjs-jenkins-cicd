pipeline {
	agent any 
	tools {
		docker 'latest'
	}
	stages { 
		stage ("Test") {
			agent {
				docker { 
					image "16.20.0-alpine3.17"
				}
			}
			steps { 
				sh "node --version"
				sh "npm install"
				sh "npm test"
			}
		}
	}
}