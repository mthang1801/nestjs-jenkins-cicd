pipeline {
	agent any 	 
	stages { 
		stage ("Test") {			
			agent { docker { image 'node:16.13.1-alpine'}}
			steps { 
				sh "node --version"
				sh "npm install"
				sh "npm test"
			}
		}
	}
}