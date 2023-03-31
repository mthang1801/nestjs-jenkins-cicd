pipeline {
	agent any 
	 tools {
        docker 'latest'
		nodejs 'NodeJS16.20'
    }
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