pipeline {
	agent any
	stages { 
		stage ("Test") {			
			agent { { image 'node:16.20' } }
			steps { 
				sh "node --version"
				sh "npm install"
				sh "npm test"
			}
		}
	}
}