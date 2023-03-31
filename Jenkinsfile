pipeline {
	agent { any { image 'node:16.20' } }
	stages { 
		stage ("Test") {			
			
			steps { 
				sh "node --version"
				sh "npm install"
				sh "npm test"
			}
		}
	}
}